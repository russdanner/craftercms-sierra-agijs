# Studio UI Goodies

This is a plugin that contains a number of UI "Goodies."

What is a goodie? Nothing specific. This plugin is a collection of UI tweaks and alternatives to
help you customize the editing experience for your content authors to make them as efficient as
possible.

If you see a widget that helps you here, install it and be happy. If not, make the world a better
place by doing a bit of programming and send us pull request :)

## Widgets

### Top Navigation Toolbar

- Toolbar Edit button 
- Toolbar Publish button

## Sidebar

- Sidebar Tool Panel Accordion

# Installation

Install the plugin via Studio's Plugin Management UI under `Site Tools` > `Plugin Management`.

## Install based on this repository

You can also install this plugin by cloning this repository and using the Studio API.

1. Create a Studio JWT Token.
2. Execute the following CURL command a terminal

```bash
curl --location --request POST 'http://SERVER_AND_PORT/studio/api/2/marketplace/copy' \
--header 'Authorization: Bearer THE_JWT_TOKEN_FOR_STUDIO' \
--header 'Content-Type: application/json' \
--data-raw '{
  "siteId": "YOUR-SITE-ID",
  "path": "THE_ABSOLUTEL_FILE_SYSTEM_PATH_TO_THIS_REPO",
  "parameters": { }
}
```

# Widget Configuration Guide

## Toolbar Edit button

```xml
<widget id="org.rd.plugin.uigoodies.EditOrViewCurrent">
	<plugin
		id="org.rd.plugin.uigoodies"
		site="{site}"
		type="apps"
		name="uigoodies"
		file="index.js"
	/>
	<configuration>
		<useIcon>true</useIcon>
	</configuration>
</widget>
```

## Toolbar Publish button

```xml
<widget id="org.rd.plugin.uigoodies.PublishOrRequestPublish">
	<plugin
		id="org.rd.plugin.uigoodies"
		site="{site}"
		type="apps"
		name="uigoodies"
		file="index.js"
	/>
	<configuration>
		<useIcon>true</useIcon>
	</configuration>
</widget>
```

## Sidebar Tool Panel Accordion

```xml
<widget id="org.rd.plugin.uigoodies.ToolPanelAccordion">
	<plugin
		id="org.rd.plugin.uigoodies"
		site="{site}"
		type="apps"
		name="uigoodies"
		file="index.js"
	/>
	<configuration>
		<title>Shortcuts</title>
		<icon id="@mui/icons-material/SentimentSatisfiedOutlined"/>
        <sxs>
            <accordionDetails>
                <paddingLeft>15px</paddingLeft>
            </accordionDetails>
        </sxs>
		<widgets>
			<widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
				<configuration>
					<title>Content Types</title>
					<icon id="@mui/icons-material/WidgetsOutlined"/>
					<widget id="craftercms.components.ContentTypeManagement">
						<configuration>
							<embedded>true</embedded>
						</configuration>
					</widget>
				</configuration>
			</widget>
			<widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
				<configuration>
					<title>Encryption Tool</title>
					<icon id="@mui/icons-material/LockOutlined"/>
					<widget id="craftercms.components.SiteEncryptTool">
						<configuration>
							<embedded>true</embedded>
						</configuration>
					</widget>
				</configuration>
			</widget>
			<widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
				<configuration>
					<title>Configuration</title>
					<icon id="@mui/icons-material/SettingsApplicationsOutlined"/>
					<widget id="craftercms.components.SiteConfigurationManagement">
						<configuration>
							<embedded>true</embedded>
						</configuration>
					</widget>
				</configuration>
			</widget>
			<widget id="craftercms.components.ToolsPanelEmbeddedAppViewButton">
				<configuration>
					<title>Plugin Management</title>
					<icon id="@mui/icons-material/ExtensionOutlined"/>
					<widget id="craftercms.components.PluginManagement">
						<configuration>
							<embedded>true</embedded>
						</configuration>
					</widget>
				</configuration>
			</widget>
		</widgets>
	</configuration>
</widget>
```

## Sidebar Content Upload Button

```xml
<widget id="org.rd.plugin.uigoodies.openContentUploadPanelButton">
    <plugin
      id="org.rd.plugin.uigoodies"
      site="{site}"
      type="apps"
      name="uigoodies"
      file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Upload Content</title>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```

## Toolbar Content Upload Button

```xml
<widget id="org.rd.plugin.uigoodies.openContentUploadToolbarButton">
    <plugin
      id="org.rd.plugin.uigoodies"
      site="{site}"
      type="apps"
      name="uigoodies"
      file="index.js"
    />
    <!-- optional parameters -->
    <configuration>
        <title>Upload Content</title>
        <dialogTitle>Upload Content</dialogTitle>
        <icon id="@mui/icons-material/FileUploadRounded"/>
        <defaultPath>/site/components/headers</defaultPath>
        <allowPathSelection>true</allowPathSelection>
    </configuration>
</widget>
```
