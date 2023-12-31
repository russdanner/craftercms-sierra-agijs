<#import "/templates/system/common/crafter.ftl" as crafter />

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>CrafterCMS | Sierra AGI Games</title>
		<style>
            @font-face {
                font-family: agifont;
                src: url(/static-assets/app/sierra-agi-font.ttf);
            }
              
            h1 {
                color: purple;
            }

            h2 {
                color: blue;
            }

            a {
                color: lightblue;
                text-decoration: none;
            }

            li a {
                color: lightgreen;
                text-decoration: none;
            }
            
            
			html, body {
				color: white; 
				height: 90%;
				background: darkgray;
				font-family: agifont;
				line-height: 35px;
			}
			
			main {
				max-width: 90%;
				padding: 40px;
				background: black; 
				border-radius: 20px;
				margin: 15px auto;
			}
		</style>

		<@crafter.head/>
	</head>
	<body>
		<@crafter.body_top/>
		<main>
		    <h1>Play retro Sierra games using CrafterCMS and AGI.js</h1>
		    
		    <h2>Choose a game title</h2>
		    <p>
		    Hey Roger! It's time for some adventure!
		    </p><p>
		    This is not what you had in mind when your boss said "you FINALLY get to choose your own title"</p><p>I guess you will always be a janitor.</h2>
		    </p>
		    
		    <img style="width:50%; margin-left:25%; display:block;" src="/static-assets/images/picktitle.png" />
		    
		    <h3>Available Game Titles</h3>
            <@crafter.navigation url="/site/website/games" showNavElement=false includeRoot=false depth=2 />


			<@crafter.h1 $field="title_t">${model.title_t}</@crafter.h1>
			<@crafter.div $field="body_html">${model.body_html}</@crafter.div>
		</main>
		<@crafter.body_bottom/>
	</body>
</html>
