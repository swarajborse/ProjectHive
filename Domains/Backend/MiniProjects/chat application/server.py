import socket
import threading

def receive():
    while True:
        try:
            data = conn.recv(1024).decode()
            if not data:
                break
            print("friend:", data)
            if 'exit' in data:
                break
        except:
            print("no data received")
            break

def sending():
    while True:
        try:
            data= input()
            conn.send(data.encode())
            if 'exit' in data:
                break
        except:
            break



s = socket.socket()
s.bind(('localhost', 1920))
s.listen()
print("listening...")
    
conn, adr = s.accept()
print("Connection established with:", adr)


c1= threading.Thread(target=sending)
c2= threading.Thread(target=receive)

c1.start()
c2.start()

c1.join()
c2.join()

   
conn.close()

