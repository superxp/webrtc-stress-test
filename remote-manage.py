# -*- coding: utf-8 -*-
import paramiko
import sys
import os
import subprocess

#python remote-manage.py -anchor 10 -audience 10 -roomName 996 -t 100 
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

anchorNum = args[2]
audienceNum = args[4]
roomName = args[6]


anchorRoleList = ['durant']
audienceRoleList = ['durant']


everyMachineAnchorRoomNum = int(anchorNum)/len(anchorRoleList)
mxx = int(anchorNum)%len(anchorRoleList)


everyMachineAudienceRoomNum = int(audienceNum)/len(audienceRoleList)


for i in anchorRoleList:
	subprocess.Popen('python remote-exec.py -h '+i+' -role anchor  -n '+str(everyMachineAnchorRoomNum)+' -t 100 -roomName '+roomName);
	

for i in audienceRoleList:
	subprocess.Popen('python remote-exec.py -h '+i+' -role audience  -n '+str(everyMachineAudienceRoomNum)+' -t 100 -roomName ');	
	
	
 



	