#!/bin/bash
rm -rf node_modules && yarn install && rm -rf ios/Pods ios/Podfile.lock && yarn fixGif && cd ios && pod install
