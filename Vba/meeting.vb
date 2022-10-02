'Class Module: Meeting

'Contains the information for a single meaning
'Coursename, meeting type, days held, start/end hour,
'start/end hour

Public courseName As String                      'CIS*3760'
Public meetingType As String                     'LEC'
Public days As Variant                           'mon, wed, fri'
Public startHour As Integer                      '4
Public startMinute As Integer                    '30
Public startDayHalf As String                    'AM
Public endHour As Integer                        '5
Public endMinute As Integer                      '20
Public endDayHalf As String                      'PM
Public courseColor As Integer

'Runs on initialization
Private Sub Class_Initialize()
    courseName = "NULL"
    meetingType = "NULL"
    startHour = -1
    startMinute = -1
    startDayHalf = "NULL"
    endHour = -1
    endMinute = -1
    endDayHalf = "NULL"
    courseColor = 1
End Sub

Public Property Set Day(Value As Collection)
    Set days = Value
End Property

Public Sub toString()
    Debug.Print courseName
    Debug.Print meetingType
    Debug.Print startHour
    Debug.Print startMinute
    Debug.Print startDayHalf
    Debug.Print endHour
    Debug.Print endMinute
    Debug.Print endDayHalf
    
End Sub

'String split the courseName at first space
Public Sub setCourseName(str As String)
    courseName = Split(str, " ")(0)
End Sub

Public Sub setMeeting(str As String)
    If StrComp("NULL", str) = 0 Then
        Exit Sub
    End If

    'Split string after Lec
    Dim pieces As Variant
    pieces = Split(str, " ", 2)
    'Lec, Sem, Lab or Exam
    meetingType = pieces(0)
    If InStr(pieces(1), "Days TBA") = 0 Then
        splitString = Replace(pieces(1), " ", "")
        days = Split(splitString, ",")
    End If

End Sub

'Assigns time information to class instance
Public Sub setHours(str As String)
    If StrComp("NULL", str) = 0 Then
        meetingType = "NULL"
        Exit Sub
    End If
    
    If StrComp("Times TBA", str) = 0 Then
        meetingType = "NULL"
        Exit Sub
    End If

    'Substrings for extracting characters
    startHour = Left(str, 2)
    startMinute = Mid(str, 4, 2)
    startDayHalf = Mid(str, 6, 2)
    
    endHour = Mid(str, 11, 2)
    endMinute = Mid(str, 14, 2)
    endDayHalf = Mid(str, 16, 2)
End Sub

'Gets the actual cell value of the start of a class on the schedule
Public Property Get GetStartCell(row As Integer)
    Dim adjust As Integer
    Dim index As Integer
    
    adjust = 8
    If startDayHalf = "PM" Then
        If Not startHour = 12 Then
            adjust = -4
        End If
    End If
    index = (startHour - adjust) * 2 + row
    If startMinute < 30 Then
        index = index - 1
    End If
    GetStartCell = index
End Property

'Gets the actual cell value of the end of a class on the schedule
Public Property Get GetEndCell(row As Integer) As Integer
    Dim adjust As Integer
    Dim index As Integer
    
    adjust = 8
    If endDayHalf = "PM" Then
        If Not endHour = 12 Then
            adjust = -4
        End If
    End If
    index = (endHour - adjust) * 2 + row
        
    'rounding-down for :20 min timings
    If endMinute <= 30 Then
        index = index - 1
    End If
    GetEndCell = index
End Property
