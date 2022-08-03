using Api.Models.Request;
using Api.Models.Response;
using GraphQL.Types;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Types.Request
{
    public class AddRecipeType : InputObjectGraphType<AddRecipeModel>
    {
        public AddRecipeType()
        {
            Field(x => x.title);
            Field(x => x.description);
            Field(x => x.instructions);
            Field<ListGraphType<AddIngredientType>>("ingredients");
            Field(x => x.preptime);            
            Field<ListGraphType<AddTagType>>("tags");
        }
    }

    public class AddIngredientType : InputObjectGraphType<AddIngredient>
    {
        public AddIngredientType()
        {
            Field(x => x.name);
            Field(x => x.amount);
            Field<AddIngredientUnitType>("unit");
            Field(x => x.comment);
        }
    }

    public class AddTagType : InputObjectGraphType<AddTag>
    {
        public AddTagType()
        {
            Field(x => x.value);
        }
    }


    public class AddIngredientUnitType : EnumerationGraphType<IngredientUnit> {}
}
