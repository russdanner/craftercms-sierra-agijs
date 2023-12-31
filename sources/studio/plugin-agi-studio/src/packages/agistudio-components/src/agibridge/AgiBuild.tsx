import { get } from '@craftercms/studio-ui/utils/ajax';
import AgiResources from './AgiResources';

export class AgiBuild {
  compile = (siteId, gameId, callback) => {
    var gameResources = this.loadSources(siteId, gameId, {
      next: function (gameResources) {
        var agiResources = new AgiResources();
        agiResources.saveGame(siteId, gameId, gameResources, callback);
      }
    });
  };

  loadSources = (siteId, gameId, callback) => {
    var wait = 0;

    let resourcesServiceUrl = `/api/1/site/content_store/tree.json?url=/static-assets/games/${gameId}/src`;

    get(resourcesServiceUrl).subscribe({
      next: (resourceResponse) => {
        let downloadList = [];

        for (var r = 0; r < resourceResponse.response.children.length; r++) {
          let item = resourceResponse.response.children[r];

          if (item.name == 'picture' || item.name == 'logic' || item.name == 'view' || item.name == 'sound') {
            for (var p = 0; p < item.children.length; p++) {
              let sourceItem = item.children[p];
              downloadList.push(sourceItem.url);
            }
          }
          else if(item.name == 'object.json') {
            downloadList.push(item.url);
          }
          else if(item.name == 'words.json') {
            downloadList.push(item.url);
          }
        }
        console.log('Loading Resources');
        let agiResources = new AgiResources();
        agiResources.downloadGameData('', downloadList, function (gameData) {
          console.log('Ready to Build');
          callback.next(gameData);
        });
      },
      error(e) {}
    });
  };
}

export default AgiBuild;
