import socket
import threading

def sending():
    while True:
        try:
            data= input()
            c.send(data.encode())
            if 'exit' in data:
                break
        except:
            break

def receive():
    while True:
        try:
            data = c.recv(1024).decode()
            if not data:
                break
            print("friend:", data)
            if 'exit' in data:
                break
        except:
            break

c = socket.socket()
c.connect(('localhost', 1920))

c1= threading.Thread(target=receive)
c2= threading.Thread(target=sending)


c1.start()
c2.start()

c1.join()
c2.join()

c.close()
