using Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Request
{ 
    public class AddRecipeModel
    {
        public string title { get; set; }
        public string description { get; set; }
        public string instructions { get; set; }
        public List<Ingredient> ingredients { get; set; }
        public double preptime { get; set; }
        public List<Tag> tags { get; set; }
    }

    public class AddIngredient
    {
        public string name { get; set; }
        public double amount { get; set; }
        public IngredientUnit unit { get; set; }
        public string comment { get; set; }
    }

    public class AddTag
    {
        public string value { get; set; }
    }            
}
