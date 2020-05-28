# -*- coding: utf-8 -*-
import paramiko
import sys

#python remote-exec.py -h durant -role audience  -n 10 -t 100 -roomName xiaopang 
# -h 主机名
# -role 角色名
# -n  数量
# -t 执行时间
# -roomName 房间名称|
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
roomName = args[10]


#创建一个ssh的客户端，用来连接服务器
ssh = paramiko.SSHClient()
#创建一个ssh的白名单
know_host = paramiko.AutoAddPolicy()
#加载创建的白名单
ssh.set_missing_host_key_policy(know_host)
							
			
MachineInfoDict= {
            
			"durant":{"hostname" : "10.20.12.237",
			"port" : 22,
			"username" :"durant",
			"password" :"1",
			"os":"Linux"
			},
			
			"durant1":{"hostname" : "10.20.10.98",
			"port" : 22,
			"username" :"durant1",
			"password" :"1",
            "os":"Linux"			
			},
			
			"durantWindows1":{"hostname" : "10.20.10.53",
			"port" : 22,
			"username" :"durant.zeng",
			"password" :"1qaz!QAZ1",
			"os":"Windows"
			},
			
			"durantWindows2":{"hostname" : "10.20.12.130",
			"port" : 22,
			"username" :"durant.zeng",
			"password" :"1qaz!QAZ1",
			"os":"Windows"
			},
			
			"nignWindows":{"hostname" : "10.20.12.207",
			"port" : 22,
			"username" :"ning.ou",
			"password" :"ONL@132015onl",
			"os":"Windows"
			}
			}
			
			

#print machineName 

MachineInfo = MachineInfoDict[machineName]

print MachineInfo
#print type(MachineInfo)
machineOs = MachineInfo["os"];

 
#连接服务器
ssh.connect(
    hostname = MachineInfo["hostname"],
    port = MachineInfo["port"],
    username = MachineInfo["username"],
    password = MachineInfo["password"]
)


#执行命令


if role == 'anchor' and machineOs == 'Linux':	
	command = 'cd webrtc-stress-test-durant  && nohup node anchor-muti.js '+roomName+' '+numberx+' >../logs/log-Anchor-'+roomName+'.txt  2>&1 &'

if role == 'anchor' and machineOs == 'Windows':
	command = 'cd webrtc-stress-test-durant&node anchor-muti.js '+roomName+' '+numberx+' >../logs/log-Anchor-'+roomName+'.txt'

if role == 'audience'  and machineOs == 'Linux':
	command = 'cd webrtc-stress-test-durant && nohup node audience-mutli.js '+roomName+' '+numberx+' >../logs/log-Audience-'+roomName+'.txt  2>&1 &'

if role == 'audience'  and machineOs == 'Windows':
	command = 'cd webrtc-stress-test-durant&node audience-mutli.js '+roomName+' '+numberx+' >../logs/log-Audience-'+roomName+'.txt'
    	
			
print command			
#windows 与 linux 区分
stdin1,stdout1,stderr1 = ssh.exec_command(command)
#print(stdout1.read().decode('gbk'))
#print(stderr1.read().decode('gbk'))
ssh.close()