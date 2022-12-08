import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import API from '../constants/API';
import { Images } from '../theme';
import { EventsListDataType } from '../features/Events/Events.slice';
import { TicketsListDataType } from '../features/Tickets/Tickets.slice';
import { TicketsDetailDataType } from '../features/TicketDetail/TicketDetail.slice';

const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

const Users = [
  {
    uid: 1,
    username: 'crowdserve-admin',
    role: 'admin',
    password: 'crowdserve',
    email: 'backoffice@crowdserve.xyz',
  },
  {
    uid: 2,
    username: 'crowdserve-guest',
    role: 'guest',
    password: 'crowdserve',
    email: 'backoffice@crowdserve.xyz',
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
          reject(new Error('Username and password are invalid.'));
        }
      }, 2000);
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
        id: '20221125',
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
        id: '20221126',
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
        id: '20221127',
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
        id: '20221128',
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
        id: '20221129',
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
        id: '202211210',
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
        id: '2022112111',
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
        id: '2022112122',
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
        id: '2022112133',
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
        id: '202211214',
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
        id: '202211215',
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
        id: '202211216',
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
        id: '202211217',
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
        id: '202211218',
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
        id: '202211219',
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
        id: '202211220',
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
        id: '202211211',
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
        id: '202211212',
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
        id: '202211213',
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
        id: '2022112144',
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
        event_id: '20221125',
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
        event_id: '20221125',
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
        event_id: '20221125',
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
        event_id: '20221125',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221126',
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
        event_id: '20221125',
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

    if (params.id) {
      const ticketsForEvent = ticketsListData.filter(
        (item) => item.event_id === params.id,
      );
      ticketsListData = ticketsForEvent;
    }

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
                total: (params.eventId && 5) || 25,
              },
            },
          ]);
        }, 2000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  mock
    .onGet(new RegExp(`${API.getEventsDetail.get}`.replace('{id}', '(.*)')))
    .reply(() => {
      const eventDetailData = {
        event_id: '20221125',
        event_name: 'Test event 12937493',
        organizer: 'CrowdServe',
        event_description:
          'Serving the Crowd, empowering fans and artistes through blockchain. CrowdServe believes that the events industry should be powered by the fans and the artistes.',
        location: 'Singapore',
        date: 'Nov 5, 2022',
        time: '15:30 - 17:30',
        ticketInfo: [
          {
            ticket_type: 'VIP 1',
            nft_image: Images.TestImg,
            nft_description:
              'Serving the Crowd, empowering fans and artistes through blockchain. CrowdServe believes that the events industry should be powered by the fans and the artistes.',
          },
          {
            ticket_type: 'VIP 2',
            nft_image: Images.TestImg,
            nft_description:
              'Serving the Crowd, empowering fans and artistes through blockchain. CrowdServe believes that the events industry should be powered by the fans and the artistes.',
          },
          {
            ticket_type: 'VIP 3',
            nft_image: Images.TestImg,
            nft_description:
              'Serving the Crowd, empowering fans and artistes through blockchain. CrowdServe believes that the events industry should be powered by the fans and the artistes.',
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                success: true,
                results: {
                  data: eventDetailData,
                },
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  mock
    .onGet(new RegExp(`${API.ticketsDetail.get}`.replace('{id}', '(.*)')))
    .reply(() => {
      const ticketsDetailData: TicketsDetailDataType = {
        user_name: 'User 1',
        user_email: 'user1@crowdserve.com',
        event_name: 'Event 1 Event 1 Event 1',
        organizer: 'Organizer 1',
        ticket_type: 'General',
        seat_number: '01',
        price: '$ 300',
        ticket_number: 'K0J2947294759275',
        nft_ticket: 'Test event 12937493 - VIP',
        view_blockchain: 'https://app.crowdserve.xyz',
        ticket_status: 'Upcoming',
        allowed_status: ['Upcoming', 'Cancelled', 'Used'],
        last_updates: 'Nov 20, 2022  15:32:38',
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                success: true,
                results: {
                  data: ticketsDetailData,
                },
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  mock
    .onPut(new RegExp(`${API.ticketsDetail.put}`.replace('{id}', '(.*)')))
    .reply(
      () =>
        new Promise((resolve, reject) => {
          if (resolve) {
            setTimeout(() => {
              resolve([
                200,
                {
                  success: true,
                  results: {
                    data: {},
                  },
                },
              ]);
            }, 2000);
          } else {
            reject(new Error('Something is wrong'));
          }
        }),
    );

  mock.onGet(API.getTransactionsList.get).reply((config: any) => {
    const { params } = config;
    let transactionsListData = [
      {
        id: 1,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user1@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 2,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user2@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 3,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user3@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 4,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user4@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 5,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user5@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 6,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user6@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 7,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user7@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 8,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user8@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 9,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user9@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 10,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user10@crowdserve.com',
        status: 'Pending',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 11,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user11@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 12,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user12@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 13,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user13@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 14,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user14@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 15,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user15@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 16,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user16@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 1, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 17,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user17@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 28, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 18,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user18@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 19,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user19@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 30, 2022',
          timeRange: '18:30',
        },
      },
      {
        id: 20,
        bank_holder: 'Sledge Hammer',
        bank_account: 'BNP Paribas SA 1234 5678 9012 345',
        amount_reflected: '10.00 SGD',
        user_email: 'user20@crowdserve.com',
        status: 'Completed',
        submitted_at: {
          date: 'Oct 31, 2022',
          timeRange: '15:30',
        },
      },
    ];

    if (params.page === 2) {
      const transactionsListDataCompleted: any = [];
      transactionsListData.forEach((item, index) => {
        if (index <= 4) {
          transactionsListDataCompleted.push({ ...item, status: 'Completed' });
        }
      });
      transactionsListData = transactionsListDataCompleted;
    }
    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              success: true,
              results: {
                data: transactionsListData,
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
  mock.onPost(API.transactions.post).reply(
    () =>
      new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                success: true,
                results: {
                  data: {},
                },
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      }),
  );

  mock
    .onGet(new RegExp(`${API.transactions.get}`.replace('{id}', '(.*)')))
    .reply(() => {
      const transactionDetailData = {
        id: 1,
        user_email: 'user1@crowdserve.com',
        bank_name: 'BNP Paribas SA',
        amount: '10.00 SGD',
        bank_holder: 'Sledge Hammer',
        bank_account: '1234 5678 9012 345',
        submitted_at: 'Oct 31, 2022 15:32:38',
        last_action_at: '',
        status: 'Pending',
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                success: true,
                results: {
                  data: transactionDetailData,
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
