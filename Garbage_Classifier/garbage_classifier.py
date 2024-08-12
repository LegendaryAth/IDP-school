import os
import cvzone
from cvzone.ClassificationModule import Classifier
import cv2
from skimage import transform

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
classifier = Classifier('Garbage_Classifier/keras_model.h5', 'Garbage_Classifier/labels.txt')
font = cv2.FONT_HERSHEY_SIMPLEX
org = (750, 350)
fontScale = 1
color = (255, 0, 0)
thickness = 2
while True:
    _, img = cap.read()
    imgResize = cv2.resize(img, (454, 340))
    bg = cv2.imread('Garbage_Classifier/bg.png')
    prediction = classifier.getPrediction(img)
    classID = prediction[1]
    print(classID)
    if classID != 0:
        if classID == 1:
            bg = cv2.putText(bg, 'Cardboard-Biodegradable', org, font,

                                fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 2:
            bg = cv2.putText(bg, 'Glass-Solid Waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 3:
            bg = cv2.putText(bg, 'Footwear-Textile waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 4:
            bg = cv2.putText(bg, 'Clothes-Textile waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 5:
            bg = cv2.putText(bg, 'Metal-Non-Biodegradable', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 6:
            bg = cv2.putText(bg, 'Paper-Biodegradable', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 7:
            bg = cv2.putText(bg, 'Battery-Hazardous', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 8:
            bg = cv2.putText(bg, 'Organic Waste-Biodegradable', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 9:
            bg = cv2.putText(bg, 'Toothbursh-Non-Biodegradable', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 10:
            bg = cv2.putText(bg, 'Diaper/Pads-Rejected Waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 11:
            bg = cv2.putText(bg, 'Mask-Household waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 12:
            bg = cv2.putText(bg, 'Plastic-Non-biodegradable', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
        elif classID == 13:
            bg = cv2.putText(bg, 'Phone-E-waste', org, font,
                             fontScale, color, thickness, cv2.LINE_AA)
    bg[148:148+340, 159:159+454] = imgResize
    cv2.imshow("GreenSort: Your Personal Waste Segregation Assistant", bg)
    cv2.waitKey(1)