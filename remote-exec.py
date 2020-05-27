# -*- coding: utf-8 -*-
import paramiko
import sys


#print '参数列表:', str(sys.argv)

args = sys.argv

#print type(args)

if len(args) < 9 :
	print '缺少参数'
	sys.exit(-1)
	
	
machineName = args[2]
role = args[4]
numberx = args[6]
execTime = args[8] 


#创建一个ssh的客户端，用来连接服务器
ssh = paramiko.SSHClient()
#创建一个ssh的白名单
know_host = paramiko.AutoAddPolicy()
#加载创建的白名单
ssh.set_missing_host_key_policy(know_host)
							
			
MachineInfoDict= {"durant":{"hostname" : "10.20.12.237",
			"port" : 22,
			"username" :"durant",
			"password" :"1"},
			"durant1":{"hostname" : "10.20.10.98",
			"port" : 22,
			"username" :"durant1",
			"password" :"1"}}
			
			

#print machineName 

MachineInfo = MachineInfoDict[machineName]

#print MachineInfo
#print type(MachineInfo)



 
#连接服务器
ssh.connect(
    hostname = MachineInfo["hostname"],
    port = MachineInfo["port"],
    username = MachineInfo["username"],
    password = MachineInfo["password"]
)



#执行命令


if role == 'anchor':	
	command = 'cd webrtc-stress-test-durant && git pull && node anchor-muti.js '
else:
	command = 'cd webrtc-stress-test-durant && git pull && node audience-mutli.js'
			
print command			
#windows 与 linux 区分
stdin1,stdout1,stderr1 = ssh.exec_command(command)
print(stdout1.read().decode())
print(stderr1.read().decode())
