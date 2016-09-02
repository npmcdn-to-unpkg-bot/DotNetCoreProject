using System;
using System.Collections.Generic;
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;
using Core.Common.Utilities;

namespace DotNetCoreTestWebProject.Models
{
    public partial class Genre : BaseObjectWithState, IObjectWithState
    {
        public Genre()
        {
            Track = new HashSet<Track>();
            Guid = StringUtils.GenerateLowercase32DigitsGuid();
            DateCreated = DateTime.Now;
            DateModified = DateCreated;
        }

        public long GenreId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Track> Track { get; set; }
    }
}
