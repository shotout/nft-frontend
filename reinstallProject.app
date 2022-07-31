#!/bin/bash
rm -rf node_modules && yarn install && yarn fixGif && yarn fixDebug && rm -rf ios/Pods ios/Podfile.lock && cd ios && pod install
