using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Api.Models.Request
{
    public class SearchRecipeModel
    {
        public string keywords { get; set; }
        public List<string> ingredients { get; set; }
        public SearchPrepTime preptime { get; set; }
        public SearchLastCooked last_cooked { get; set; }
        public List<string> tags { get; set; }
    }

    public class SearchPrepTime
    {
        public double value { get; set; }
        public DoubleComparator comparator { get; set; }

    }

    public class SearchLastCooked
    {
        public DateTime value { get; set; }
        public DatetimeComparator comparator { get; set; }

    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum DoubleComparator
    {
        [EnumMember(Value = "=")]
        Equals,

        [EnumMember(Value = "!=")]
        Not_Equals,

        [EnumMember(Value = ">")]
        Greater,

        [EnumMember(Value = ">=")]
        Greater_Equals,

        [EnumMember(Value = "<")]
        Lesser,

        [EnumMember(Value = "<=")]
        Lesser_Equals
    }

    [JsonConverter(typeof(StringEnumConverter))]
    public enum DatetimeComparator
    {
        [EnumMember(Value = "<")]
        Before,

        [EnumMember(Value = ">")]
        After,

        [EnumMember(Value = "=")]
        At
    }
}
