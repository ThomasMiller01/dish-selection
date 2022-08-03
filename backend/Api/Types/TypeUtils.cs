using Api.Models.Response;
using GraphQL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Types
{
    public class TypeUtils
    {
        public static string serializeEnum(Enum _unit)
        {
            // input: "GRAM"
            // output: "\"g\""
            var serialized = JsonConvert.SerializeObject(_unit);

            // input: "\"g\""
            // output: "g"
            var trimmed = serialized.Remove(0, 1);
            trimmed = trimmed.Remove(trimmed.Length - 1, 1);

            var unit = trimmed;

            return unit;
        }
    }
}
