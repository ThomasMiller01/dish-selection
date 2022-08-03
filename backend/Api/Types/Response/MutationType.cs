using Api.Models.Response;
using GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Types
{
    public class MutationType : ObjectGraphType<MutationModel>
    {
        public MutationType()
        {
            Field(x => x.value);
        }        
    }
}
