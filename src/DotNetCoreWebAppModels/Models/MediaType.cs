using System;
using System.Collections.Generic;
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;
using Core.Common.Utilities;

namespace DotNetCoreTestWebProject.Models
{
    public partial class MediaType : BaseObjectWithState, IObjectWithState
    {
        public MediaType()
        {
            Track = new HashSet<Track>();
            Guid = StringUtils.GenerateLowercase32DigitsGuid();
            DateCreated = DateTime.Now;
            DateModified = DateCreated;
        }

        public long MediaTypeId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Track> Track { get; set; }
    }
}
