using System;
using System.Collections.Generic;
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;
using Core.Common.Utilities;

namespace DotNetCoreTestWebProject.Models
{
    public partial class Album : BaseObjectWithState, IObjectWithState
    {
        public Album()
        {
            Track = new HashSet<Track>();
            Guid = StringUtils.GenerateLowercase32DigitsGuid();
            DateCreated = DateTime.Now;
            DateModified = DateCreated;
        }

        public long AlbumId { get; set; }
        public string Title { get; set; }
        public long ArtistId { get; set; }

        public virtual ICollection<Track> Track { get; set; }
        public virtual Artist Artist { get; set; }
    }
}
