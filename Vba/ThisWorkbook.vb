Option Explicit

Const rootRow As Integer = 6
Const rootCol As Integer = 4
'This holds the row number/courseID of a course
'After using getCourseID. If -1 course was not found
Dim courseID As Integer
Dim meetings As Collection
Dim helperMeetings As Collection
Public i As Integer

Sub main()
'Remember to clear suggested courses here
'So that courses are suggested on every generate

    Set meetings = New Collection
    
    'User inputs
    Dim inputs As Variant
    inputs = Range("J6:J10").Value
    
    i = 35                                       'set base color
    
    'populate meetings with meeting instances for each course in input
    Dim course As Variant
    Dim validCourses As Integer
    For Each course In inputs
        If IsEmpty(course) = False Then
            getMeetings (course)
            validCourses = validCourses + 1
        End If
        
    Next course
    placeMeetings

    Set helperMeetings = CourseHelper.helperMeetings(validCourses)
    Debug.Print helperMeetings(1)
End Sub

Sub placeMeetings()
  
    Dim aMeet As Variant
    Dim Day As Variant
    Dim dayNum As Integer
    Dim adjust As Integer
    Dim cellIndex As Integer
    Dim conCheck As Integer
    For Each aMeet In meetings                   'Plot each meeting
        For Each Day In aMeet.days
            dayNum = GetDayNum(CStr(Day), rootCol)
            Dim r1 As Range                      'Top cell (coursename)
            Dim r2 As Range                      'Second to top cell (meetingtype)
            Dim r3 As Range                      'Second to bottom cell
            Dim r4 As Range                      'Bottom cell
            
            Set r1 = Worksheets("interface").Cells(aMeet.GetStartCell(rootRow), dayNum)
            Set r2 = Worksheets("interface").Cells(aMeet.GetStartCell(rootRow) + 1, dayNum)
            Set r3 = Worksheets("interface").Cells(aMeet.GetEndCell(rootRow) - 1, dayNum)
            Set r4 = Worksheets("interface").Cells(aMeet.GetEndCell(rootRow), dayNum)
            
            If Not Range(r1, r4).Interior.Color = RGB(183, 215, 246) Then
                MsgBox (aMeet.courseName & " Conflicts with one of your other selections")
            End If
            
            'Set formatting and color for a course being placed
            Range(r1, r4).Interior.ColorIndex = aMeet.courseColor
            Range(r2, r3).Borders(Excel.XlBordersIndex.xlEdgeTop).LineStyle = Excel.XlLineStyle.xlLineStyleNone
            Range(r2, r3).Borders(Excel.XlBordersIndex.xlEdgeBottom).LineStyle = Excel.XlLineStyle.xlLineStyleNone
            Range(r2, r3).Borders(Excel.XlBordersIndex.xlInsideHorizontal).LineStyle = Excel.XlLineStyle.xlLineStyleNone
            Range(r2, r3).Borders(Excel.XlBordersIndex.xlInsideVertical).LineStyle = Excel.XlLineStyle.xlLineStyleNone
            r3.Value = aMeet.courseName
            r4.Value = aMeet.meetingType
        Next Day
    Next aMeet
End Sub

'Calls meeting class functions to parse information from CSV
'Adds meeting objects to the meeting collection
Sub getMeetings(theID As String)
    getCourseID (theID)
    
    If courseID = -1 Then
        'Debug.Print "INVALID COURSE"
        Exit Sub
    End If
    
    Dim meetLec As Meeting
    Set meetLec = New Meeting
    Dim meetSem As Meeting
    Set meetSem = New Meeting

    'give member variable information to meeting instance
    'second parameters are CVS column number where the information is held
    'This section of code repeats for lectures and seminars/labs, as the column numbers are subject to change,
    '   so this seems easier to switch in the future
    meetLec.setCourseName (GetValue(courseID, 4))
    meetLec.setMeeting (GetValue(courseID, 6))
    meetLec.setHours (GetValue(courseID, 7))
    meetLec.courseColor = i
    If i = 37 Then
        meetLec.courseColor = 40
    End If
    If meetLec.meetingType <> "NULL" Then
        meetings.Add meetLec
    End If
    
    meetSem.setCourseName (GetValue(courseID, 4))
    meetSem.setMeeting (GetValue(courseID, 9))
    meetSem.setHours (GetValue(courseID, 10))
    meetSem.courseColor = i
    If i = 37 Then
        meetSem.courseColor = 40
    End If
    If meetSem.meetingType <> "NULL" Then
        meetings.Add meetSem
    End If
    i = i + 1
End Sub

'Given a substring of a course code, returns the row of the first
'   instance of that substring (ascending)
Sub getCourseID(course As String)
    Dim courseRange As Range
    Set courseRange = Worksheets("courseData").Range("D1:D3036").Find(course)
    
    courseID = -1                                'set to -1 if nothing is found
    If Not courseRange Is Nothing Then
        courseID = courseRange.row
    End If
End Sub

'Grabs a string value from the CSV file
Function GetValue(row As Integer, col As Integer) As String
    GetValue = Worksheets("courseData").Cells.Item(row, col).Value
End Function

'Converts days of the week strings to cell indexes
'Takes a single string day
Function GetDayNum(Day As String, col As Integer) As Integer
    Dim theDays() As String
    Dim i As Integer
    
    'makes days array
    theDays = Split("Mon,Tues,Wed,Thur,Fri", ",")
    For i = 0 To 4
        If Day = theDays(i) Then
            GetDayNum = col + i                  'return integer matching day
        End If
    Next i
End Function

'Reset all formatting values in the course panel
Sub clearCells()
    Dim theRange As Range
    Set theRange = Worksheets("interface").Range(Cells(rootRow, rootCol), Cells(rootRow + 29, rootCol + 4))
    theRange.ClearContents                       'wipe everything
    theRange.Interior.Color = RGB(183, 215, 246) 'set colors
    
    'set borders (yep, it's this annoying)
    With theRange.Borders(xlInsideHorizontal)
        .LineStyle = xlContinuous
        .Color = RGB(255, 255, 255)
        .Weight = xlMedium
    End With
    With theRange.Borders(xlInsideVertical)
        .LineStyle = xlContinuous
        .Color = RGB(255, 255, 255)
        .Weight = xlMedium
    End With
    With theRange.Borders(xlEdgeTop)
        .LineStyle = xlContinuous
        .Color = RGB(255, 255, 255)
        .Weight = xlMedium
    End With
End Sub

Sub Clear_Click()
    clearCells
End Sub

'takes in time formated string, int encoded day of week, increments and loops
Sub incrementTime(time As String, Day As Integer)
    time = time + TimeSerial(0, 30, 0)
    If time = TimeValue("23:30") Then
        time = "8:30:00 AM"
        Day = Day + 1
        If Day > 4 Then
            Day = 0
        End If
    End If
End Sub


'test dummy function
Sub timing()
Dim myStr As String
Dim myStr2 As String
Dim date1 As Date
Dim date2 As Date

myStr = "12:11AM"
myStr = "11:15AM"

date1 = myStr
date2 = myStr

Debug.Print DateDiff(h, date1, date2)
End Sub

'Convert day value to string
Function dayIntToStr(Day As Integer) As String

    If Day = rootCol Then
        dayIntToStr = "Mon"
    ElseIf Day = rootCol + 1 Then
        dayIntToStr = "Tues"
    ElseIf Day = rootCol + 2 Then
        dayIntToStr = "Wed"
    ElseIf Day = rootCol + 3 Then
        dayIntToStr = "Thur"
    ElseIf Day = rootCol + 4 Then
        dayIntToStr = "Fri"
    End If

End Function
'convert time format to courseData format
'assume time format is 11:30:00 AM
Function formatTime(time As String) As String

    Dim pos
    pos = InStr(4, time, ":", 1)
    subString1 = Left(time, pos - 1)
    subString2 = Right(time, 2)
    formatTime = subString1 & subString2
    
End Function
'Get course code only from course title
Function trimCourseName(course As String) As String
    Dim pos
    pos = InStr(1, course, " ", 1)
    trimCourseName = Left(course, pos - 1)
    
End Function
Function suggestCourse(Day As Integer, time As String) As String

    Dim pos
    Dim dayString, timeString, startTime, tempCourse As String
    dayString = dayIntToStr(Day)
    Dim dayRange, timeRange As Range
    Set dayRange = Worksheets("courseData").Range("F1:F3036")
    
    timeString = formatTime(time)
    
    For Each cell In dayRange
        pos = InStr(1, cell.Value, dayString, 1)
        'check day contains in cell
        If pos <> 0 And Not IsNull(pos) Then
            'trim the starting time in courseData
            startTime = Left(cell.Offset(0, 1).Value, 7)
            'check time contains in cell 1 unit to the right
            pos = InStr(1, startTime, timeString, 1)
            If pos <> 0 And Not IsNull(pos) Then
                tempCourse = cell.Offset(0, -3).Value
                suggestCourse = trimCourseName(tempCourse)
        
        End If
    Next cell
    'compare it with our day parameter
    'if match then get time (24h format)

End Function
