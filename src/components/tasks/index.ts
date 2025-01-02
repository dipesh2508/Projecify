export interface Task {
    assignedToId: string;
    createdAt: string;
    description: string;
    dueDate: string;
    id: string;
    priority: "HIGH" | "MEDIUM" | "LOW" | "URGENT";
    project: {
      id: string;
      name: string;
      projectId: string;
      status: "COMPLETED" | "IN_PROGRESS" | "IN_REVIEW" | "TODO";
    };
    status: "COMPLETED" | "IN_PROGRESS" | "IN_REVIEW" | "TODO";
    title: string;
    updatedAt: string;
  }
  
  export const calendarCustomStyles = {
    '.fc': {
      '--fc-border-color': 'rgb(229 231 235)',
      '--fc-button-bg-color': 'transparent',
      '--fc-button-border-color': 'rgb(229 231 235)',
      '--fc-button-hover-bg-color': 'rgb(243 244 246)',
      '--fc-button-hover-border-color': 'rgb(229 231 235)',
      '--fc-button-active-bg-color': 'rgb(243 244 246)',
      '--fc-today-bg-color': 'rgb(50 170 70)',
      '--fc-neutral-bg-color': 'rgb(255 255 255)',
      'height': '650px',
    },
    '.fc-theme-standard .fc-scrollgrid': {
      borderColor: 'var(--fc-border-color)',
    },
    '.fc .fc-button': {
      padding: '0.5rem 1rem',
      fontWeight: '500',
      fontSize: '0.875rem',
      borderRadius: '0.375rem',
      color: 'rgb(55 65 81)',
    },
    '.fc .fc-button-primary:not(:disabled).fc-button-active, .fc .fc-button-primary:not(:disabled):active': {
      color: 'rgb(55 65 81)',
    },
    '.fc-direction-ltr .fc-button-group > .fc-button:not(:last-child)': {
      borderTopRightRadius: '0',
      borderBottomRightRadius: '0',
    },
    '.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child)': {
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0',
      marginLeft: '-1px',
    },
    '.fc-theme-standard td, .fc-theme-standard th': {
      borderColor: 'var(--fc-border-color)',
    },
    '.fc .fc-daygrid-day-number': {
      padding: '0.5rem',
      color: 'rgb(55 65 81)',
    },
    '.dark .fc': {
      '--fc-border-color': 'rgb(55 65 81)',
      '--fc-button-hover-bg-color': 'rgb(31 41 55)',
      '--fc-neutral-bg-color': 'rgb(17 24 39)',
      color: 'rgb(229 231 235)',
    },
    '.dark .fc .fc-button': {
      color: 'rgb(229 231 235)',
    },
    '.dark .fc .fc-daygrid-day-number': {
      color: 'rgb(229 231 235)',
    },
  };