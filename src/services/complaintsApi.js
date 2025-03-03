export const complaintsApi = {
  getAllComplaints: async (userId) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    return complaints.filter(complaint => complaint.userId === userId);
  },

  createComplaint: async (complaintData) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const newComplaint = {
      id: Date.now(),
      ...complaintData
    };
    complaints.unshift(newComplaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
    return newComplaint;
  },

  updateComplaintStatus: async (complaintId, status) => {
    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaintIndex = complaints.findIndex(c => c.id === complaintId);
    if (complaintIndex !== -1) {
      complaints[complaintIndex].status = status;
      localStorage.setItem('complaints', JSON.stringify(complaints));
      return complaints[complaintIndex];
    }
    throw new Error('Complaint not found');
  },  // Added comma here
  
  // Forum related methods
  getDepartmentStats: async (department) => {
    const discussions = JSON.parse(localStorage.getItem('forum_discussions') || '[]');
    const departmentDiscussions = discussions.filter(disc => disc.department === department);
    return {
      activeMembers: 12, // Default value for demo
      topicsToday: 5,    // Default value for demo
      discussions: departmentDiscussions
    };
  },
  getAllDiscussions: async () => {
    const discussions = JSON.parse(localStorage.getItem('forum_discussions') || '[]');
    return discussions;
  },
  getDiscussionsByDepartment: async (department) => {
    const discussions = JSON.parse(localStorage.getItem('forum_discussions') || '[]');
    return department === 'all' 
      ? discussions 
      : discussions.filter(disc => disc.department === department);
  },
  createDiscussion: async (discussionData) => {
    const discussions = JSON.parse(localStorage.getItem('forum_discussions') || '[]');
    const newDiscussion = {
      id: Date.now(),
      ...discussionData,
      replies: 0,
      timestamp: new Date().toISOString(),
      messages: [{
        id: 1,
        ...discussionData,
        timestamp: new Date().toISOString()
      }]
    };
    discussions.unshift(newDiscussion);
    localStorage.setItem('forum_discussions', JSON.stringify(discussions));
    return newDiscussion;
  },
  addMessage: async (discussionId, messageData) => {
    const discussions = JSON.parse(localStorage.getItem('forum_discussions') || '[]');
    const discussionIndex = discussions.findIndex(d => d.id === discussionId);
    
    if (discussionIndex !== -1) {
      const newMessage = {
        id: discussions[discussionIndex].messages.length + 1,
        ...messageData,
        timestamp: new Date().toISOString()
      };
      discussions[discussionIndex].messages.push(newMessage);
      discussions[discussionIndex].replies += 1;
      localStorage.setItem('forum_discussions', JSON.stringify(discussions));
      return discussions[discussionIndex];
    }
    throw new Error('Discussion not found');
  }
};