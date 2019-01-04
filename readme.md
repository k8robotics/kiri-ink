[Kiri.Ink](https://kiri-ink-217817.appspot.com/kiri) hosts live versions of the latest tagged code

### Getting Started

1. Load extensions
```
npm update
```

2. Create symlinks to client side extensions
UNIX
Call these commands from the /js/ directory
```
ln -s ../node_modules/tween.js/index.js ext-tween.js
ln -s ../node_modules/three/build/three.min.js js/ext-three.js
ln -s ../node_modules/n3d-threejs/index.js js/ext-n3d.js
```
Windows (in CMD not Powershell)
Call these commands from the parent directory
```
mklink js\ext-tween.js ..\node_modules\tween.js\index.js
mklink js\ext-three.js ..\node_modules\three\build\three.min.js
mklink js\ext-n3d.js ..\node_modules\n3d-threejs\index.js
```

3. Start local server
```
npm start
```

to start a local instance of the apps.
4. Open 
[Kiri:Ink](http://localhost:8080/kiri)

### Other Start Options

```
npm run-script start-web
```
serves code as obfuscated, compressed bundles. this is the mode used to run on a public
web site, so you can't use "localhost" to test. to accomodate this, alias "debug" to 127.0.0.1
then access the apps from http://debug:8080/

## More Information

Powered by Kiri:Moto on [Grid.Space](https://grid.space)
* [Forums](https://forum.grid.space)
* [Wiki](https://github.com/GridSpace/KiriMoto/wiki)
* [YouTube Tutorials](https://www.youtube.com/c/gridspace)

## Hosting info
Hosting problems:
gcloud app engine doesnt see symlinks except on windows
Current Workaround
Hardcode the symlinks and deploy