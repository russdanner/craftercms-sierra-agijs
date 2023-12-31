# Sample Component Library Plugin

This example demonstrates how to create a CrafterCMS extension that exports various widgets that can be used across Studio UI.

These instructions assume you have a project called `editorial-neue`. Update accordingly if your
project id is something different.

Instructions:
- Run `yarn` on the root
- Use the `example-cra` to test & develop your plugins agilely
  - Run `yarn build` to build the files you can use to test on the test app.
- When ready to deploy run `yarn dist` and create a plugin using the `dist/*` files with CATEGORY set to `apps`
  and NAME set to `library`. 
  - `apps` & `library` can be what ever naming you wish to use, update your plugin descriptor file and directories accordingly
  - `apps` represents the type — or category — of plugin
  - `library` represents the plugin name
- Update the `installation` section in your plugin descriptor file to auto-wire your plugin where you want to show them. For example, to show them on the right sidebar of the Preview app you may use the config below:
  - **Note**: the id you use on the `<widget />` elements `id` attribute, should match the id of the component as exported on your index.js (see [index.tsx](src/index.tsx))

```yaml
installation:
  - type: preview-app
    parentXpath: //widget[@id='craftercms.components.ICEToolsPanel']
    testXpath: //plugin[@id='org.craftercms.plugin.experience.builder']
    element:
      name: configuration
      children:
      - name: widgets
        children:
        - name: widget
          attributes:
          - name: id
            value: org.craftercms.example.viewProjectsPanelButton
          children:
          - name: plugin
            attributes:
            - name: id
              value: org.craftercms.plugin
            - name: type
              value: apps
            - name: name
              value: library
            - name: file
              value: index.js
```

- Finally, install your newly created plugin via the `crafter-cli` command `copy-plugin`.

To learn more on creating plugins in CrafterCMS, see [CrafterCMS plugins documentation](https://docs.craftercms.org/en/4.0/developers/extensions/plugins.html) 
