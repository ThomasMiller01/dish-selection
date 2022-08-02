using Api.Models.Response;
using GraphQL.Types;
using Newtonsoft.Json;

namespace Api.Types
{
    public class RecipeType : ObjectGraphType<RecipeModel>
    {
        public RecipeType()
        {
            Field(x => x.id);
            Field(x => x.title);
            Field(x => x.description);
            Field(x => x.instructions);
            Field<ListGraphType<IngredientType>>("ingredients");
            Field(x => x.preptime);
            Field(x => x.last_cooked);
            Field(x => x.created);
            Field<ListGraphType<TagType>>("tags");
        }
    }

    public class IngredientType : ObjectGraphType<Ingredient>
    {
        public IngredientType()
        {
            Field(x => x.id);
            Field(x => x.name);
            Field(x => x.amount);
            Field<StringGraphType>("unit", resolve: x =>
            {
                // input: "GRAM"
                // output: "\"g\""
                var serialized = JsonConvert.SerializeObject(x.Source.unit);

                // input: "\"g\""
                // output: "g"
                var trimmed = serialized.Remove(0, 1);
                trimmed = trimmed.Remove(trimmed.Length - 1, 1);

                var unit = trimmed;

                return unit;
            }
            );
            Field(x => x.comment);
        }
    }

    public class TagType : ObjectGraphType<Tag>
    {
        public TagType()
        {
            Field(x => x.id);
            Field(x => x.value);
        }
    }

    public class IngredientUnitType : EnumerationGraphType<IngredientUnit> {
        public IngredientUnitType()
        {
            
        }
    }
}
