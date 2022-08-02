using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Api.Models.Response
{
    public class RecipeModel
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string instructions { get; set; }
        public List<Ingredient> ingredients { get; set; }        
        public float preptime { get; set; }        
        public string last_cooked { get; set; }
        public string created { get; set; }
        public List<Tag> tags { get; set; }
    }

    public class Ingredient
    {
        public int id { get; set; }
        public string name { get; set; }
        public float amount { get; set; }
        public IngredientUnit unit {get; set;}
        public string comment{ get; set; }
    }

    public class Tag
    {
        public int id { get; set; }
        public string value { get; set; }
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum IngredientUnit
    {
        [EnumMember(Value = "Stück")]
        Pieces,
        
        [EnumMember(Value = "g")]
        Gram,

        [EnumMember(Value = "kg")]
        Kilograms,

        [EnumMember(Value = "EL")]
        Table_Spoon,

        [EnumMember(Value = "TL")]
        Tea_Spoon,

        [EnumMember(Value = "etwas")]
        A_Bit,
    }
}
