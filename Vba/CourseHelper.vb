'Subs can change values but don't return anything
Sub hello()
    Debug.Print ("Hey! I'm the course helper.")
End Sub

'Functions return values
Function helperMeetings(numCourses As Integer) As Object
    'Debug.Print numCourses
    Set helperMeetings = New Collection
    helperMeetings.Add ("MATH*1200*0101")
    helperMeetings.Add ("MATH*1220*0101")
End Function

