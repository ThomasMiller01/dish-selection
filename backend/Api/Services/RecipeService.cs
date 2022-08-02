using Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

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
            while (recipesReader.Read())
            {
                var id = recipesReader.GetInt32(0);
                var title = recipesReader.GetString(1);
                var description = recipesReader.GetString(2);
                var instructions = recipesReader.GetString(3);
                var preptime = recipesReader.GetFloat(4);
                var last_cooked = recipesReader.GetDateTime(5);
                var created= recipesReader.GetDateTime(6);

                recipes.Add(new RecipeModel {
                    id = id,
                    title = title,
                    description = description,
                    instructions = instructions,
                    preptime = preptime,
                    last_cooked = last_cooked.ToString("HH:mm:ss.f dd.MM.yyyy"),
                    created = created.ToString("HH:mm:ss.f dd.MM.yyyy")
                });
            }
            recipesReader.Close();

            var ingredientsQuery = "SELECT r.id, i.* FROM recipe_ingredients AS ri INNER JOIN recipes AS r ON ri.recipe_id=r.id INNER JOIN ingredients AS i ON ri.ingredient_id=i.id";
            var ingredientsCommand = new MySqlCommand(ingredientsQuery, this.database);
            var ingredientsReader = ingredientsCommand.ExecuteReader();
            while (ingredientsReader.Read())
            {
                var recipe_id = ingredientsReader.GetInt32(0);
                var ingredient_id = ingredientsReader.GetInt32(1);
                var name = ingredientsReader.GetString(2);
                var amount = ingredientsReader.GetFloat(3);
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
            ingredientsReader.Close();

            var tagsQuery = "SELECT r.id, t.* FROM recipe_tags AS rt INNER JOIN recipes AS r ON rt.recipe_id=r.id INNER JOIN tags AS t ON rt.tag_id=t.id";
            var tagsCommand = new MySqlCommand(tagsQuery, this.database);
            var tagsReader = tagsCommand.ExecuteReader();
            while (tagsReader.Read())
            {
                var recipe_id = tagsReader.GetInt32(0);
                var tag_id = tagsReader.GetInt32(1);
                var value = tagsReader.GetString(2);                

                var recipeIndex = recipes.FindIndex(r => r.id == recipe_id);
                if (recipes[recipeIndex].tags == null) recipes[recipeIndex].tags = new List<Tag>();
                recipes[recipeIndex].tags.Add(new Tag
                {
                    id=tag_id,
                    value=value
                });
            }
            tagsReader.Close();

            return recipes;
        }
    }
}
