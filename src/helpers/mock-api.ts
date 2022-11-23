import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import API from '../constants/API';
import { EventsListDataType } from '../features/Events/Events.slice';
import { TicketsListDataType } from '../features/Tickets/Tickets.slice';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const Users = [
  {
    uid: 1,
    username: 'ui-react',
    role: 'admin',
    password: 'uireact',
    email: 'ui-react@imaginato.com',
  },
];

const MockAPI = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);
  mock.onPost(API.login.post).reply((config: any) => {
    const user = JSON.parse(config.data);
    const validUser = Users.filter(
      (usr) => usr.username === user.username && usr.password === user.password,
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser.length === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = ACCESS_TOKEN;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const userObj = {
            uid: validUser[0].uid,
            username: validUser[0].username,
            role: validUser[0].role,
            email: validUser[0].email,
          };
          const validUserObj = { ...userObj, ...tokenObj }; // validUser Obj

          resolve([
            200,
            {
              success: true,
              results: validUserObj,
            },
          ]);
        } else {
          reject(
            new Error(
              'Username and password are invalid. Please enter correct username and password',
            ),
          );
        }
      });
    });
  });

  mock.onPost(API.register.post).reply((config: any) => {
    const user = JSON.parse(config.data);
    const uidObj = {
      uid: 2,
      role: 'admin',
    };
    const userObj = { ...user, ...uidObj };
    Users.push(userObj);
    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: userObj,
            },
          ]);
        });
      } else {
        reject(
          new Error(
            'Email and password are invalid. Please enter correct email and password',
          ),
        );
      }
    });
  });

  mock.onGet(API.getEventsList.get).reply((config: any) => {
    const { params } = config;
    let eventsListData: EventsListDataType[] = [
      {
        id: 1,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 2,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 3,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 4,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 5,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 6,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 7,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 8,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 9,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 10,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 11,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 12,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 13,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 14,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 15,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 16,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 17,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 18,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 19,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
      {
        id: 20,
        event_name: 'Event 1 Event 1 Event 1',
        event_time: {
          date: 'Nov 5, 2022',
          timeRange: '5:30~17:30',
        },
        location: 'Singaprore',
        organizer: 'Organizer 2',
        partner: 'Partner3',
        created_at: {
          date: 'Oct 31, 2022',
          timeRange: '6:30',
        },
        status: 'Upcoming',
      },
    ];

    if (params.page === 2) {
      const eventsListDataEnded: EventsListDataType[] = [];
      eventsListData.forEach((item, index) => {
        if (index <= 4) {
          eventsListDataEnded.push({ ...item, status: 'Ended' });
        }
      });
      eventsListData = eventsListDataEnded;
    }

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: {
                data: eventsListData,
                total: 25,
              },
            },
          ]);
        }, 2000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  mock.onGet(API.getTicketsList.get).reply((config: any) => {
    const { params } = config;
    let ticketsListData = [
      {
        id: 1,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 2,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 3,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 4,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 5,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 6,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 7,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 8,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 9,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 10,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 11,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 12,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 13,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 14,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 15,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 16,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 17,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 18,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 19,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
      {
        id: 20,
        ticket_number: 'K0J2947294759275',
        user_name: 'User1',
        user_email: 'user1@crowdserve.com',
        ticket_type: 'VIP',
        seat_number: '01',
        bought_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
        status: 'Upcoming',
      },
    ];

    if (params.page === 2) {
      const ticketsListDataCancelled: TicketsListDataType[] = [];
      ticketsListData.forEach((item, index) => {
        if (index <= 4) {
          ticketsListDataCancelled.push({ ...item, status: 'Cancelled' });
        }
      });
      ticketsListData = ticketsListDataCancelled;
    }

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: {
                data: ticketsListData,
                total: 25,
              },
            },
          ]);
        }, 2000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });
};

export default MockAPI;
