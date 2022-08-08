using Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Api.Models.Request;
using Api.Types;

namespace Api.Services
{
    public class RecipeService
    {
        private readonly string connectionString;

        public RecipeService()
        {
            this.connectionString = @"server=localhost;port=3306;userid=root;password=adminpass;database=recipes";
            // this.connectionString = @"server=mysql;port=3306;userid=root;password=rootpass;database=recipes";
        }

        public IEnumerable<RecipeModel> getRecipes()
        {
            List<RecipeModel> recipes = new List<RecipeModel>();
            using (var connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();
                var recipesQuery = "SELECT * FROM recipes";
                var recipesCommand = new MySqlCommand(recipesQuery, connection);
                var recipesReader = recipesCommand.ExecuteReader();
                try
                {
                    while (recipesReader.Read())
                    {
                        var id = recipesReader.GetInt32(0);
                        var title = recipesReader.GetString(1);
                        var description = recipesReader.GetString(2);
                        var instructions = recipesReader.GetString(3);
                        var preptime = recipesReader.GetDouble(4);
                        var people = recipesReader.GetInt32(5);
                        var last_cooked = recipesReader.GetDateTime(6);
                        var created = recipesReader.GetDateTime(7);

                        recipes.Add(new RecipeModel
                        {
                            id = id,
                            title = title,
                            description = description,
                            instructions = instructions,
                            preptime = preptime,
                            people = people,
                            last_cooked = last_cooked,
                            created = created,
                            ingredients = new List<Ingredient>(),
                            tags = new List<Tag>()
                        });
                    }
                }
                finally
                {
                    recipesReader.Close();
                }

                var ingredientsQuery = "SELECT r.id, i.* FROM recipe_ingredients AS ri INNER JOIN recipes AS r ON ri.recipe_id=r.id INNER JOIN ingredients AS i ON ri.ingredient_id=i.id";
                var ingredientsCommand = new MySqlCommand(ingredientsQuery, connection);
                var ingredientsReader = ingredientsCommand.ExecuteReader();
                try
                {
                    while (ingredientsReader.Read())
                    {
                        var recipe_id = ingredientsReader.GetInt32(0);
                        var ingredient_id = ingredientsReader.GetInt32(1);
                        var name = ingredientsReader.GetString(2);
                        var amount = ingredientsReader.GetString(3);
                        var unit = ingredientsReader.GetString(4);
                        var comment = ingredientsReader.GetString(5);

                        var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);
                        recipes[recipeIndex].ingredients.Add(new Ingredient
                        {
                            id = ingredient_id,
                            name = name,
                            amount = amount,
                            unit = (IngredientUnit)Enum.Parse(typeof(IngredientUnit), unit, true),
                            comment = comment
                        });
                    }
                }
                finally
                {
                    ingredientsReader.Close();
                }

                var tagsQuery = "SELECT r.id, t.* FROM recipe_tags AS rt INNER JOIN recipes AS r ON rt.recipe_id=r.id INNER JOIN tags AS t ON rt.tag_id=t.id";
                var tagsCommand = new MySqlCommand(tagsQuery, connection);
                var tagsReader = tagsCommand.ExecuteReader();
                try
                {
                    while (tagsReader.Read())
                    {
                        var recipe_id = tagsReader.GetInt32(0);
                        var tag_id = tagsReader.GetInt32(1);
                        var value = tagsReader.GetString(2);

                        var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);
                        recipes[recipeIndex].tags.Add(new Tag
                        {
                            id = tag_id,
                            value = value
                        });
                    }
                }
                finally
                {
                    tagsReader.Close();
                }
            }

            return recipes;
        }

        public List<RecipeModel> searchRecipes(SearchRecipeModel search)
        {
            var recipes = new List<RecipeModel>();
            using (var connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.Connection = connection;

                string joinedTablesQuery = "SELECT * FROM recipes AS r LEFT JOIN recipe_ingredients AS ri ON r.id=ri.recipe_id LEFT JOIN ingredients AS i ON ri.ingredient_id=i.id LEFT JOIN recipe_tags AS rt ON r.id=rt.recipe_id LEFT JOIN tags AS t ON rt.tag_id=t.id";
                List<string> wheres = new List<string>();

                // keywords
                if (search.keywords != null && search.keywords != string.Empty)
                {
                    string[] keywords = search.keywords.Split(" ").Select(c => string.Format("%{0}%", c)).ToArray();
                    List<string> parsedKeywords = new List<string>();
                    for (int i = 0; i < keywords.Count(); i++)
                    {
                        var keyword = keywords[i];
                        if (keyword != string.Empty)
                        {
                            parsedKeywords.Add(string.Format("(r.title LIKE @KEYWORD{0} OR r.description LIKE @KEYWORD{0} OR r.instructions LIKE @KEYWORD{0})", i));
                            command.Parameters.AddWithValue(string.Format("@KEYWORD{0}", i), keywords[i]);
                        }
                    }
                    string concatenatedKeywords = string.Join(" AND ", parsedKeywords);

                    if (concatenatedKeywords != string.Empty) wheres.Add(concatenatedKeywords);
                }

                // preptime
                if (search.preptime != null)
                {
                    var parsedPreptime = string.Format("preptime{0}'{1}'", TypeUtils.serializeEnum(search.preptime.comparator), search.preptime.value);
                    wheres.Add(parsedPreptime);
                }

                // people
                if (search.people != null)
                {
                    var parsedPeople = string.Format("people{0}'{1}'", TypeUtils.serializeEnum(search.people.comparator), search.people.value);
                    wheres.Add(parsedPeople);
                }

                // last_cooked
                if (search.last_cooked != null)
                {
                    var parsedLastCooked = string.Format("last_cooked{0}'{1}'", TypeUtils.serializeEnum(search.last_cooked.comparator), search.last_cooked.value.ToString("yyy-MM-dd HH:mm:ss"));
                    wheres.Add(parsedLastCooked);
                }

                // ingredients
                if (search.ingredients != null && search.ingredients.Count() != 0)
                {
                    string[] ingredients = search.ingredients.Select(c => string.Format("%{0}%", c)).ToArray();
                    List<string> parsedIngredients = new List<string>();
                    for (int i = 0; i < ingredients.Count(); i++)
                    {
                        var ingredient = ingredients[i];
                        if (ingredient != string.Empty)
                        {
                            parsedIngredients.Add(string.Format("(i.name LIKE @INGREDIENT{0} OR i.comment LIKE @INGREDIENT{0})", i));
                            command.Parameters.AddWithValue(string.Format("@INGREDIENT{0}", i), ingredient);
                        }
                    }
                    string concatenatedIngredients = string.Join(" AND ", parsedIngredients);

                    if (concatenatedIngredients != string.Empty) wheres.Add(concatenatedIngredients);

                }

                // tags
                if (search.tags != null && search.tags.Count() != 0)
                {
                    string[] tags = search.tags.Select(c => string.Format("%{0}%", c)).ToArray();
                    List<string> parsedTags = new List<string>();
                    for (int i = 0; i < tags.Count(); i++)
                    {
                        var tag = tags[i];
                        if (tag != string.Empty)
                        {
                            parsedTags.Add(string.Format("(t.value LIKE @TAG{0})", i));
                            command.Parameters.AddWithValue(string.Format("@TAG{0}", i), tags[i]);
                        }
                    }
                    string concatenatedTags = string.Join(" AND ", parsedTags);

                    if (concatenatedTags != string.Empty) wheres.Add(concatenatedTags);
                }

                if (wheres.Count() != 0)
                {
                    joinedTablesQuery += " WHERE " + string.Join(" AND ", wheres);
                }

                // get sql result
                command.CommandText = joinedTablesQuery;
                var reader = command.ExecuteReader();

                // construct recipes from results                
                try
                {
                    while (reader.Read())
                    {
                        // add recipe
                        var recipe_id = reader.GetInt32(0);
                        if (recipes.FindIndex(r => r.id == recipe_id) == -1)
                        {
                            recipes.Add(new RecipeModel
                            {
                                id = recipe_id,
                                title = reader.GetString(1),
                                description = reader.GetString(2),
                                instructions = reader.GetString(3),
                                preptime = reader.GetDouble(4),
                                people = reader.GetInt32(5),
                                last_cooked = reader.GetDateTime(6),
                                created = reader.GetDateTime(7),
                                ingredients = new List<Ingredient>(),
                                tags = new List<Tag>(),
                            });
                        }
                        var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);

                        // add ingredient
                        var ingredient_id = UtilityService.CheckDbForNull(reader, 11) ? -1 : reader.GetInt32(11);
                        if (ingredient_id != -1 && recipes[recipeIndex].ingredients.FindIndex(r => r.id == ingredient_id) == -1)
                        {
                            recipes[recipeIndex].ingredients.Add(new Ingredient
                            {
                                id = ingredient_id,
                                name = reader.GetString(12),
                                amount = reader.GetString(13),
                                unit = (IngredientUnit)Enum.Parse(typeof(IngredientUnit), reader.GetString(14), true),
                                comment = reader.GetString(15)
                            });
                        }

                        // add tag
                        var tag_id = UtilityService.CheckDbForNull(reader, 19) ? -1 : reader.GetInt32(19);
                        if (tag_id != -1 && recipes[recipeIndex].tags.FindIndex(r => r.id == tag_id) == -1)
                        {
                            recipes[recipeIndex].tags.Add(new Tag
                            {
                                id = tag_id,
                                value = reader.GetString(20)
                            });
                        }
                    }
                }
                finally
                {
                    reader.Close();
                }
            }

            return recipes;
        }

        public RecipeModel getRecipeById(int id)
        {
            var recipe = new RecipeModel();

            using (var connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();
                var recipeQuery = "SELECT * FROM recipes WHERE id=@id";
                var recipeCommand = new MySqlCommand(recipeQuery, connection);
                recipeCommand.Parameters.AddWithValue("@id", id);
                var recipeReader = recipeCommand.ExecuteReader();
                try
                {
                    recipeReader.Read();

                    if (!recipeReader.HasRows)
                    {
                        throw new KeyNotFoundException();
                    }

                    recipe.id = recipeReader.GetInt32(0);
                    recipe.title = recipeReader.GetString(1);
                    recipe.description = recipeReader.GetString(2);
                    recipe.instructions = recipeReader.GetString(3);
                    recipe.preptime = recipeReader.GetDouble(4);
                    recipe.people = recipeReader.GetInt32(5);
                    recipe.last_cooked = recipeReader.GetDateTime(6);
                    recipe.created = recipeReader.GetDateTime(7);
                    recipe.ingredients = new List<Ingredient>();
                    recipe.tags = new List<Tag>();
                }
                finally
                {
                    recipeReader.Close();
                }

                var ingredientsQuery = "SELECT i.* FROM recipe_ingredients AS ri INNER JOIN ingredients AS i ON ri.ingredient_id=i.id WHERE ri.recipe_id=@id";
                var ingredientsCommand = new MySqlCommand(ingredientsQuery, connection);
                ingredientsCommand.Parameters.AddWithValue("@id", id);
                var ingredientsReader = ingredientsCommand.ExecuteReader();
                try
                {
                    while (ingredientsReader.Read())
                    {
                        var ingredient_id = ingredientsReader.GetInt32(0);
                        var name = ingredientsReader.GetString(1);
                        var amount = ingredientsReader.GetString(2);
                        var unit = ingredientsReader.GetString(3);
                        var comment = ingredientsReader.GetString(4);

                        recipe.ingredients.Add(new Ingredient
                        {
                            id = ingredient_id,
                            name = name,
                            amount = amount,
                            unit = (IngredientUnit)Enum.Parse(typeof(IngredientUnit), unit, true),
                            comment = comment
                        });
                    }
                }
                finally
                {
                    ingredientsReader.Close();
                }

                var tagsQuery = "SELECT t.* FROM recipe_tags AS rt INNER JOIN tags AS t ON rt.tag_id=t.id WHERE rt.recipe_id=@id";
                var tagsCommand = new MySqlCommand(tagsQuery, connection);
                tagsCommand.Parameters.AddWithValue("@id", id);
                var tagsReader = tagsCommand.ExecuteReader();
                try
                {
                    while (tagsReader.Read())
                    {
                        var tag_id = tagsReader.GetInt32(0);
                        var value = tagsReader.GetString(1);

                        recipe.tags.Add(new Tag
                        {
                            id = tag_id,
                            value = value
                        });
                    }
                }
                finally
                {
                    tagsReader.Close();
                }
            }

            return recipe;
        }

        public string addRecipe(AddRecipeModel recipe)
        {
            object recipe_id;
            using (var connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                MySqlTransaction transaction = connection.BeginTransaction();

                command.Connection = connection;
                command.Transaction = transaction;

                var getLastId = "SELECT last_insert_id()";

                // add recipe
                var addRecipeQuery = "INSERT INTO recipes (title, description, instructions, preptime, people) VALUES (@title, @description, @instructions, @preptime, @people)";
                command.CommandText = addRecipeQuery;
                command.Parameters.Clear();
                command.Parameters.AddWithValue("@title", recipe.title);
                command.Parameters.AddWithValue("@description", recipe.description);
                command.Parameters.AddWithValue("@instructions", recipe.instructions);
                command.Parameters.AddWithValue("@preptime", recipe.preptime);
                command.Parameters.AddWithValue("@people", recipe.people);
                command.ExecuteNonQuery();

                // get recipe id
                command.CommandText = getLastId;
                recipe_id = command.ExecuteScalar();


                // add ingredient and also add the recipe-ingredient link
                var addIngredientsQuery = "INSERT INTO ingredients (name, amount, unit, comment) VALUES (@name, @amount, @unit, @comment)";
                var addRecipeIngredientLinkQuery = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (@recipe_id, @ingredient_id)";
                foreach (var ingredient in recipe.ingredients)
                {
                    // add ingredient
                    command.CommandText = addIngredientsQuery;
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@name", ingredient.name);
                    command.Parameters.AddWithValue("@amount", ingredient.amount);
                    command.Parameters.AddWithValue("@unit", ingredient.unit);
                    command.Parameters.AddWithValue("@comment", ingredient.comment);
                    command.ExecuteNonQuery();

                    // get ingredient id
                    command.CommandText = getLastId;
                    var ingredient_id = command.ExecuteScalar();

                    // add recipe-ingredient link
                    command.CommandText = addRecipeIngredientLinkQuery;
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@recipe_id", recipe_id);
                    command.Parameters.AddWithValue("@ingredient_id", ingredient_id);
                    command.ExecuteNonQuery();
                }

                // add tag and also add the recipe-tag link
                var addTagsQuery = "INSERT INTO tags (value) VALUES (@value)";
                var addRecipeTagLinkQuery = "INSERT INTO recipe_tags (recipe_id, tag_id) VALUES (@recipe_id, @tag_id)";
                foreach (var tag in recipe.tags)
                {
                    // add ingredient
                    command.CommandText = addTagsQuery;
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@value", tag.value);
                    command.ExecuteNonQuery();

                    // get tag id
                    command.CommandText = getLastId;
                    var tag_id = command.ExecuteScalar();

                    // add recipe-ingredient link
                    command.CommandText = addRecipeTagLinkQuery;
                    command.Parameters.Clear();
                    command.Parameters.AddWithValue("@recipe_id", recipe_id);
                    command.Parameters.AddWithValue("@tag_id", tag_id);
                    command.ExecuteNonQuery();
                }

                transaction.Commit();
            }           

            return recipe_id.ToString();
        }

        public RecipeModel nextRecipe()
        {
            object recipe_id = -1;
            using (var connection = new MySqlConnection(this.connectionString))
            {
                connection.Open();
                var nextRecipeQuery = "SELECT id FROM recipes WHERE last_cooked < CURDATE() - INTERVAL 14 DAY ORDER BY RAND()";
                var nextRecipeCommand = new MySqlCommand(nextRecipeQuery, connection);
                recipe_id = nextRecipeCommand.ExecuteScalar();

                if (recipe_id == null)
                {
                    var anyRecipeQuery = "SELECT id FROM recipes ORDER BY RAND()";
                    var anyRecipeCommand = new MySqlCommand(anyRecipeQuery, connection);
                    recipe_id = anyRecipeCommand.ExecuteScalar();
                }
            }

            return this.getRecipeById((int)recipe_id);            
        }

        public string cookRecipe(int recipe_id)
        {
            using(var connection = new MySqlConnection(this.connectionString))
            {
                var updateLastCookedQuery = "UPDATE recipes SET last_cooked=CURRENT_TIMESTAMP WHERE id=@ID";
                var command = new MySqlCommand(updateLastCookedQuery, connection);
                command.Parameters.AddWithValue("@ID", recipe_id);
                command.ExecuteNonQuery();
            }
            
            return recipe_id.ToString();
        }
    }
}
