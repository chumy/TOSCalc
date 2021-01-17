#!/bin/bash

for FF in hdpi mdpi xhdpi xxhdpi xxxhdpi
do
cp /home/chumy/Proyectos/Ionic/TOSCalc/android/app/src/main/res/drawable-land-${FF}/splash.png /home/chumy/Proyectos/Ionic/TOSCalc/resources/android/splash/drawable-land-${FF}-screen.png
cp /home/chumy/Proyectos/Ionic/TOSCalc/android/app/src/main/res/drawable-port-${FF}/splash.png /home/chumy/Proyectos/Ionic/TOSCalc/resources/android/splash/drawable-port-${FF}-screen.png
cp /home/chumy/Proyectos/Ionic/TOSCalc/android/app/src/main/res/mipmap-${FF}/ic_launcher.png /home/chumy/Proyectos/Ionic/TOSCalc/resources/android/icon/drawable-${FF}-icon.png
done 
