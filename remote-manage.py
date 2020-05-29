# -*- coding: utf-8 -*-
import paramiko
import sys
import os
import subprocess

#python remote-manage.py -anchor 2 -audience 8 -roomName 996 -t 100 
# 
# -anchor 主播数量
# -audience 观众数量
# -t 执行时间
#print '参数列表:', str(sys.argv)

args = sys.argv

print '参数列表:', str(sys.argv)
print type(args)

if len(args) < 9 :
	print 'miss 缺少参数'
	sys.exit(-1)


#需要分配的主播数
anchorNum = args[2]
#需要分配的观众数
audienceNum = args[4]

roomName = args[6]

anchorMachineIp={"durant":"10.20.12.237","durantWindows1":"10.20.10.53","jina":"10.20.12.219"}

#主播2台机器
anchorRoleList = ['durantWindows1','jina']
#观众端2台机器
audienceRoleList = ['durant','ningWindows']



#每台机器分配的主播房间数
everyMachineAnchorRoomNum = int(anchorNum)/len(anchorRoleList)



#每台机器分配的观众数
#everyMachineAudienceNum  = int(audienceNum)/len(audienceRoleList)

#每个房间的观众数
everyRoomAudience = int(audienceNum)/ int(anchorNum)



print everyMachineAnchorRoomNum
print everyRoomAudience



for i in anchorRoleList:
	command = 'python remote-exec.py -h '+i+' -role anchor  -n '+str(everyMachineAnchorRoomNum)+' -t 100 -roomName '+roomName
	os.system(command)
	

# 房间数量*每个房间的观众数=观众数量	
#for i in anchorNum:
#			os.system('python remote-exec.py -h '+i+' -role audience  -n '+str(everyRoomAudience)+' -t 100 -roomName '+roomName+'-'+anchorMachineIp[x]+"-"+str(y));





a=0
for x in range (len(anchorRoleList)): 
	for y in range (everyMachineAnchorRoomNum):
		command = 'python remote-exec.py -h '+audienceRoleList[a%len(audienceRoleList)]+' -role audience  -n '+str(everyRoomAudience)+' -t 100 -roomName '+roomName+'-'+anchorMachineIp[anchorRoleList[x]]+'-'+str(y)
		os.system(command)
		a=a+1
		print command
	
	
#for i in audienceRoleList:
#	for x in anchorRoleList:
#		for y in range (everyMachineAnchorRoomNum):
#			os.system('python remote-exec.py -h '+i+' -role audience  -n '+str(everyRoomAudience)+' -t 100 -roomName '+roomName+'-'+anchorMachineIp[x]+"-"+str(y));
	
	
 



	