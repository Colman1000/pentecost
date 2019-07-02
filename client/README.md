# EasePharmacy

This is the mobile app for the easypharmacy suite

## Getting Started

First of all `clone` the repo

```sh
git clone https://gitlab.com/navicstein/easepharmacy
```

### Install dependencies

i use `pnpm`

```sh
pnpm i
```

### Generate signature if you dont already have one

```sh
keytool -genkey -v -keystore easy.keystore -alias easypharm -keyalg RSA -keysize 2048 -validity 10000
```

### Sigin the app with your key

```sh
cordova run android --release -- --keystore=../easy.keystore --storePassword=1111aass --alias=easypharm --password=1111aass
```

### ETC..

### Generate Icons

> from cordova root

Icons

```sh
cordova-icon --icon=splash.png
```

Splash Screen

```sh
cordova-splash --splash=splash.svg
```
