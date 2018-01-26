export const androidClientId = '29245857360-gi2ilv6b04e6mpn9icn9ngiq0buq4elr.apps.googleusercontent.com';
export const iosClientId = '766434726628-1guelram8v9kr9mtapqa2587ss7bc6sl.apps.googleusercontent.com';
export const SERVER_URI = 'https://75bb4eb0.ngrok.io';
// *********Route************//
export const TeacherLoginRoute = '/login';
export const StudentLoginRoute = '/studentCreate';
export const DashboardRoute = '/dashboard'; // send user_id and get back the session_id, session_name and due_dates
export const JoinClassRoute = '/joinClass'; // POST user_id and joincode => get back name_class and session_id and particpant_id
export const AddClassRoute = '/addClass'; // send class name, teacher_id, joincode => get back ?
export const PostHomework = '/upload'; // POST participant_id and assignment_id
export const ClassSchedule = '/classSchedule'; // googleCalendar API
// Student Dashboard to be populated when logged in
export const ClassRoster = '/classRoster'; // send session_id => get back all the participants
export const GetAssignments = '/getAssignment'; // send session_id => get back all the assignments
export const CreateAssignments = '/createAssignment'; // send session_id => get back all the assignments
export const StudentInformation = '/studentInformation'; // send student_id and get back specific student info 
export const QueueRoute = '/queue'; // send student_id and get back specific student info 
export const ClassInfoRoute = '/classInfo'; // send student_id and get back specific student info 
export const PostFunStuff = '/funStuff'; // send student_id and get back specific student info 
export const CreateEmergencyContact = '/createEmergencyContact'; // sends userID and batch of info and creates emergencyContact for user
export const CheckAssignment = '/checkAssignment'; // sends sesssionID and assignmentID to get back list of students and whether or not they have completed the assignment
export const CreateAssignment = '/createAssignment'; // sends title, dueDate, and sessionID and creates Assignment associated with that session. 
