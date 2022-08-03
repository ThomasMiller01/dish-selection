using Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;
using Api.Models.Request;

namespace Api.Services
{
    public class RecipeService
    {
        private readonly MySqlConnection database;

        public RecipeService()
        {
            this.database = new MySqlConnection(@"server=localhost;port=3306;userid=root;password=adminpass;database=database");
            this.database.Open();
        }

        public IEnumerable<RecipeModel> getRecipes()
        {
            var recipesQuery = "SELECT * FROM recipes";
            var recipesCommand = new MySqlCommand(recipesQuery, this.database);
            var recipesReader = recipesCommand.ExecuteReader();
            List<RecipeModel> recipes = new List<RecipeModel>();
            try
            {
                while (recipesReader.Read())
                {
                    var id = recipesReader.GetInt32(0);
                    var title = recipesReader.GetString(1);
                    var description = recipesReader.GetString(2);
                    var instructions = recipesReader.GetString(3);
                    var preptime = recipesReader.GetDouble(4);
                    var last_cooked = recipesReader.GetDateTime(5);
                    var created = recipesReader.GetDateTime(6);

                    recipes.Add(new RecipeModel
                    {
                        id = id,
                        title = title,
                        description = description,
                        instructions = instructions,
                        preptime = preptime,
                        last_cooked = last_cooked.ToString("HH:mm:ss.f dd.MM.yyyy"),
                        created = created.ToString("HH:mm:ss.f dd.MM.yyyy")
                    });
                }
            }
            finally
            {
                recipesReader.Close();
            }                       

            var ingredientsQuery = "SELECT r.id, i.* FROM recipe_ingredients AS ri INNER JOIN recipes AS r ON ri.recipe_id=r.id INNER JOIN ingredients AS i ON ri.ingredient_id=i.id";
            var ingredientsCommand = new MySqlCommand(ingredientsQuery, this.database);
            var ingredientsReader = ingredientsCommand.ExecuteReader();
            try
            {
                while (ingredientsReader.Read())
                {
                    var recipe_id = ingredientsReader.GetInt32(0);
                    var ingredient_id = ingredientsReader.GetInt32(1);
                    var name = ingredientsReader.GetString(2);
                    var amount = ingredientsReader.GetDouble(3);
                    var unit = ingredientsReader.GetString(4);
                    var comment = ingredientsReader.GetString(5);

                    var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);
                    if (recipes[recipeIndex].ingredients == null) recipes[recipeIndex].ingredients = new List<Ingredient>();
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
            var tagsCommand = new MySqlCommand(tagsQuery, this.database);
            var tagsReader = tagsCommand.ExecuteReader();
            try
            {
                while (tagsReader.Read())
                {
                    var recipe_id = tagsReader.GetInt32(0);
                    var tag_id = tagsReader.GetInt32(1);
                    var value = tagsReader.GetString(2);

                    var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);
                    if (recipes[recipeIndex].tags == null) recipes[recipeIndex].tags = new List<Tag>();
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

            return recipes;
        }

        public string addRecipe(AddRecipeModel recipe)
        {
            MySqlCommand command = this.database.CreateCommand();
            MySqlTransaction transaction = this.database.BeginTransaction();

            command.Connection = this.database;
            command.Transaction = transaction;

            var getLastId = "SELECT last_insert_id()";

            // add recipe
            var addRecipeQuery = "INSERT INTO recipes (title, description, instructions, preptime) VALUES (@title, @description, @instructions, @preptime)";
            command.CommandText = addRecipeQuery;
            command.Parameters.Clear();
            command.Parameters.AddWithValue("@title", recipe.title);
            command.Parameters.AddWithValue("@description", recipe.description);
            command.Parameters.AddWithValue("@instructions", recipe.instructions);
            command.Parameters.AddWithValue("@preptime", recipe.preptime);
            command.ExecuteNonQuery();
            
            // get recipe id
            command.CommandText = getLastId;
            var recipe_id = command.ExecuteScalar();


            // add ingredient and also add the recipe-ingredient link
            var addIngredientsQuery = "INSERT INTO ingredients (name, amount, unit, comment) VALUES (@name, @amount, @unit, @comment)";
            var addRecipeIngredientLinkQuery = "INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (@recipe_id, @ingredient_id)";            
            foreach(var ingredient in recipe.ingredients)
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

            return recipe_id.ToString();
        }
    }
}
