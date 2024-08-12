import PyQt5
from PyQt5 import QtWidgets, QtCore, QtGui
from PyQt5.QtGui import QMovie
from GreenShieldUI import Ui_MainWindow
from PyQt5.QtWidgets import *
from PyQt5.QtCore import *
import sys
from cv2 import *
from cvzone.ClassificationModule import Classifier
import cv2
import webbrowser


class MainThread(QThread):
    def __init__(self):
        super(MainThread, self).__init__()

startExecution = MainThread()

class Main(QMainWindow, Ui_MainWindow):
    def __init__(self):
        super().__init__()
        self.ui = Ui_MainWindow()
        self.ui.setupUi(self)
        self.ui.pushButton_3.clicked.connect(self.Garbage_Classifier)
        self.ui.pushButton_4.clicked.connect(self.AI_assistant)
        self.ui.pushButton_2.clicked.connect(self.AQI_india)
        self.ui.pushButton.clicked.connect(self.Website)
        self.ui.pushButton_5.clicked.connect(self.startTask)
        self.ui.pushButton_6.clicked.connect(self.close)

    def startTask(self):
        timer = QTimer(self)
        timer.timeout.connect(self.showTime)
        timer.start(1000)
        startExecution.start()

    def showTime(self):
        current_time = QTime.currentTime()
        current_date = QDate.currentDate()
        label_time = current_time.toString('hh:mm:ss')
        label_date = current_date.toString(Qt.ISODate)
        self.ui.textBrowser_4.setText(label_date)
        self.ui.textBrowser_3.setText(label_time)


    def Garbage_Classifier(self):
        cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)
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
            #cv2.imshow("Image", img)
            cv2.imshow("GreenSort: Your Personal Waste Segregation Assistant", bg)
            cv2.waitKey(1)
        pass
    def AI_assistant(self):
        pass

    def AQI_india(self):
        pass

    def Website(self):
        pass

app = QApplication(sys.argv)
oh_god_im_done = Main()
oh_god_im_done.show()
sys.exit(app.exec_())