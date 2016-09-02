using System;
using Core.Common.Data.Models;
using Core.Common.Data.Interfaces;
using Core.Common.Utilities;

namespace DotNetCoreTestWebProject.Models
{
    public partial class PlaylistTrack : BaseObjectWithState, IObjectWithState
    {
        public PlaylistTrack()
        {
            Guid = StringUtils.GenerateLowercase32DigitsGuid();
            DateCreated = DateTime.Now;
            DateModified = DateCreated;
        }
        public long PlaylistId { get; set; }
        public long TrackId { get; set; }

        public virtual Playlist Playlist { get; set; }
        public virtual Track Track { get; set; }
    }
}
