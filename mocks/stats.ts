// Mock statistics for the dashboard
export const dashboardStats = {
    activeExams: 24,
    registeredUsers: 1248,
    pendingApprovals: 17,
    completedExams: 156,
    
    // Recent activity
    recentActivity: [
      {
        id: 'act-1',
        type: 'user_added',
        message: "New proctor 'John Smith' added to the system",
        timestamp: '2023-10-15T09:23:45Z',
        user: {
          id: 'user-123',
          name: 'Admin User',
        },
      },
      {
        id: 'act-2',
        type: 'exam_created',
        message: "New exam 'Fall 2023 Physics Final' created",
        timestamp: '2023-10-15T08:15:22Z',
        user: {
          id: 'user-123',
          name: 'Admin User',
        },
      },
      {
        id: 'act-3',
        type: 'document_approved',
        message: "Installation report for 'Center 12' approved",
        timestamp: '2023-10-14T16:45:10Z',
        user: {
          id: 'user-456',
          name: 'Jane Manager',
        },
      },
      {
        id: 'act-4',
        type: 'alert',
        message: "Geofence violation detected at 'Center 5'",
        timestamp: '2023-10-14T14:22:33Z',
        user: {
          id: 'user-789',
          name: 'Mark Proctor',
        },
      },
      {
        id: 'act-5',
        type: 'user_assigned',
        message: "12 proctors assigned to 'Spring Midterms'",
        timestamp: '2023-10-14T11:05:18Z',
        user: {
          id: 'user-123',
          name: 'Admin User',
        },
      },
    ],
    
    // Alerts requiring attention
    alerts: [
      {
        id: 'alert-1',
        type: 'geofence_violation',
        message: "Geofence violation at Center 5",
        severity: 'high',
        timestamp: '2023-10-15T10:23:45Z',
      },
      {
        id: 'alert-2',
        type: 'document_pending',
        message: "15 installation reports pending review",
        severity: 'medium',
        timestamp: '2023-10-15T09:15:22Z',
      },
      {
        id: 'alert-3',
        type: 'staff_shortage',
        message: "Center 8 is understaffed for tomorrow's exam",
        severity: 'high',
        timestamp: '2023-10-15T08:45:10Z',
      },
    ],
    
    // Upcoming exams
    upcomingExams: [
      {
        id: 'exam-1',
        title: 'Fall 2023 Physics Final',
        date: '2023-10-17T09:00:00Z',
        centers: 12,
        staff: 48,
        status: 'preparation',
      },
      {
        id: 'exam-2',
        title: 'Engineering Entrance Test',
        date: '2023-10-20T10:00:00Z',
        centers: 25,
        staff: 100,
        status: 'preparation',
      },
      {
        id: 'exam-3',
        title: 'Medical College Admission',
        date: '2023-10-25T08:30:00Z',
        centers: 30,
        staff: 120,
        status: 'staff_assignment',
      },
    ],
    
    // Exams in progress
    examsInProgress: [
      {
        id: 'exam-4',
        title: 'Computer Science Midterm',
        date: '2023-10-15T09:00:00Z',
        centers: 8,
        staff: 32,
        status: 'in_progress',
        completion: 45,
      },
      {
        id: 'exam-5',
        title: 'Business Administration Quiz',
        date: '2023-10-15T14:00:00Z',
        centers: 5,
        staff: 20,
        status: 'installation',
        completion: 80,
      },
    ],
    
    // Compliance metrics
    complianceMetrics: {
      documentSubmission: 92,
      staffAttendance: 97,
      geofenceCompliance: 99,
      reportCompletion: 88,
    },
  };