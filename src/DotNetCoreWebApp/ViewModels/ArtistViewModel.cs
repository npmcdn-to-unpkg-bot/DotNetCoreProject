using System.Collections.Generic;
using DotNetCoreTestWebProject.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace DotNetCoreTestWebProject.ViewModels
{
    public class ArtistViewModel : BaseViewModel
    {
        public ArtistViewModel()
        {
            ArtistsList = new List<Artist>();
        }
        public IEnumerable<Artist> ArtistsList { get; set; }

        override public List<SelectListItem> SortColumns
        {
            get
            {
                var list = new List<SelectListItem>();
                list.Add(new SelectListItem { Text = "Artist Id", Value = "ArtistId" });
                list.Add(new SelectListItem { Text = "Artist name", Value = "Name" });
                return list;
            }
        }

    }
}