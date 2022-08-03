using Api.Models.Request;
using GraphQL.Types;

namespace Api.Types.Request
{
    public class SearchRecipeType : InputObjectGraphType<SearchRecipeModel>
    {
        public SearchRecipeType()
        {
            Field(x => x.keywords, nullable: true);
            Field<ListGraphType<StringGraphType>>("ingredients");
            Field<SearchPrepTimeType>("preptime");
            Field<SearchLastCookedType>("last_cooked");
            Field<ListGraphType<StringGraphType>>("tags");            
        }
    }

    public class SearchPrepTimeType : InputObjectGraphType<SearchPrepTime>
    {
        public SearchPrepTimeType()
        {
            Field(x => x.value);
            Field<DoubleComparatorType>("comparator");
        }
    }

    public class SearchLastCookedType : InputObjectGraphType<SearchLastCooked>
    {
        public SearchLastCookedType()
        {
            Field(x => x.value);
            Field<DatetimeComparatorType>("comparator");           
        }
    }

    public class DoubleComparatorType : EnumerationGraphType<DoubleComparator> { }
    
    public class DatetimeComparatorType : EnumerationGraphType<DatetimeComparator> { }
}
