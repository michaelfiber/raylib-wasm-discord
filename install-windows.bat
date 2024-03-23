@echo off

echo "WARNING - EXPERIMENTAL"

mkdir src\external
mkdir emsdk

rem CREATE unzip.vbs
set unzip="%temp%\unzip.vbs"
if exist %unzip% del /f /q %unzip%
>%unzip%  echo Set fso = CreateObject("Scripting.FileSystemObject")
>>%unzip% echo If NOT fso.FolderExists(%1) Then
>>%unzip% echo fso.CreateFolder(%1)
>>%unzip% echo End If
>>%unzip% echo set objShell = CreateObject("Shell.Application")
>>%unzip% echo set FilesInZip=objShell.NameSpace(%2).items
>>%unzip% echo objShell.NameSpace(%1).CopyHere(FilesInZip)
>>%unzip% echo Set fso = Nothing
>>%unzip% echo Set objShell = Nothing

rem CREATE download.vbs
set download="%temp%\download.vbs"
if exist %download% del /f /q %download%
>%download%  echo Option Explicit
>>%download% echo dim args, http, url, dest, ado_stream, fs
>>%download% echo set args = WScript.Arguments
>>%download% echo url = args(0)
>>%download% echo dest = args(1)
>>%download% echo set http = CreateObject("WinHttp.WinHttpRequest.5.1")
>>%download% echo http.Open "GET", url, False
>>%download% echo http.Send
>>%download% echo if http.Status <> 200 then
>>%download% echo WScript.Echo "Request to download " & url & " failed."
>>%download% echo WScript.Quit 1
>>%download% echo end if
>>%download% echo set ado_stream = CreateObject("ADODB.Stream")
>>%download% echo ado_stream.Open
>>%download% echo ado_stream.Type = 1
>>%download% echo ado_stream.Write http.ResponseBody
>>%download% echo ado_stream.Position = 0
>>%download% echo set fs = CreateObject("Scripting.FileSystemObject")
>>%download% echo if fs.FileExists(dest) then
>>%download% echo fs.DeleteFile target
>>%download% echo end if
>>%download% echo ado_stream.SaveToFile dest
>>%download% echo ado_stream.Close

Rem DOWNLOAD AND INSTALL EMSDK
cscript //nologo %download% https://github.com/emscripten-core/emsdk/archive/refs/heads/main.zip main.zip
cscript //nologo %unzip% "emsdk\" main.zip
del main.zip
emsdk\emsdk-main\emsdk.bat install latest
emsdk\emsdk-main\emsdk.bat activate latest

Rem DOWNLOAD NIGHTLY WASM RAYLIB 
cscript //nologo %download% https://michaelfiber.github.io/raylib-nightly-wasm/libraylib.a src\external\libraylib.a
cscript //nologo %download% https://michaelfiber.github.io/raylib-nightly-wasm/raylib.h src\external\raylib.h

rem CLEAN UP VBS FILES
if exist %unzip% del /f /q %unzip%
if exist %download% del /f /q %download%

