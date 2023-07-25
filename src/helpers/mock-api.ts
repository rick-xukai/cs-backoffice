import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import API from '../constants/API';
import { Images } from '../theme';
import { EventsListDataType } from '../features/Events/Events.slice';
import { TicketsListDataType } from '../features/Tickets/Tickets.slice';
import { TicketsDetailDataType } from '../features/TicketDetail/TicketDetail.slice';

export const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const Users = [
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
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '20221126',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '20221127',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '20221128',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '20221129',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211210',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '2022112111',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '2022112122',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '2022112133',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211214',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211215',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211216',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211217',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211218',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211219',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211220',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211211',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211212',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '202211213',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
      {
        id: '2022112144',
        name: 'Event 1 Event 1 Event 1',
        time: 'Sep 01, 2023 09:00 - Sep 09, 2023 23:59',
        updatedAt: '2022-12-12T04:05:11.627Z',
        location: 'Singaprore',
        organizerName: 'Organizer 2',
        partnerName: 'Partner3',
        status: 1,
        revenue: 0,
        soldTotal: 0,
        total: 0,
        image: '',
        slug: 'test2-clkgnd4qd0016qfybhgfdkxs2',
      },
    ];

    if (params.page === 2) {
      const eventsListDataEnded: EventsListDataType[] = [];
      eventsListData.forEach((item, index) => {
        if (index <= 4) {
          eventsListDataEnded.push({ ...item, status: 3 });
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
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 2,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 3,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 4,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 5,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 6,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 7,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 8,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 9,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 10,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 11,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 12,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 13,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 14,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 15,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 16,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 17,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 18,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 19,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
      {
        id: 20,
        createdAt: '2022-12-20T08:19:48.623Z',
        price: 500,
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
      },
    ];

    // if (params.id) {
    //   const ticketsForEvent = ticketsListData.filter(
    //     (item) => item.event_id === params.id,
    //   );
    //   ticketsListData = ticketsForEvent;
    // }

    if (params.page === 2) {
      const ticketsListDataCancelled: TicketsListDataType[] = [];
      ticketsListData.forEach((item, index) => {
        if (index <= 4) {
          ticketsListDataCancelled.push({ ...item, status: 0 });
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
    .onGet(
      new RegExp(`${API.getEventsDetail.get}`.replace('{ticketId}', '(.*)')),
    )
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
    .onGet(
      new RegExp(`${API.ticketsDetail.get}`.replace('{userTicketId}', '(.*)')),
    )
    .reply(() => {
      const ticketsDetailData: TicketsDetailDataType = {
        id: 0,
        cancelledAt: '',
        createdAt: '2022-12-20T08:19:48.623Z',
        event: {
          description: 'Made by Nintendo and Imaginato.',
          endTime: '2022-12-30T10:00:00.000Z',
          id: 7,
          location: 'Qingdao, China',
          name: 'Hello',
          startTime: '2022-12-30T06:00:00.000Z',
        },
        organizerName: 'Pokémon',
        price: 500,
        redeemedAt: '',
        seat: 5,
        status: 0,
        ticketNo: 'JetDevs004005',
        ticketType: 'Xiao Xu Guai',
        updatedAt: '2022-12-20T08:19:48.623Z',
        userEmail: 'joy.zhang@imaginato.com',
        userId: 16,
        userName: 'Joy Biubiubiubiubiu',
        collectionAddress: '',
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
        id: '1',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '2',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '3',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '4',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '5',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '6',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '7',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '8',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '9',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '10',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '11',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '12',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '13',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '14',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '15',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '16',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '17',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '18',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '19',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      },
      {
        id: '20',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
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
              code: 200,
              message: 'OK',
              data: {
                list: transactionsListData,
                count: 25,
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
                code: 200,
                message: 'OK',
                data: {},
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      }),
  );

  mock
    .onGet(
      new RegExp(`${API.transactions.get}`.replace('{transactionId}', '(.*)')),
    )
    .reply(() => {
      const transactionDetailData = {
        id: '1',
        bankName: 'Sledge Hammer',
        cardHolder: 'BNP Paribas SA',
        cardNo: '1234 5678 9012 345',
        amount: 10,
        currency: 'SGD',
        userEmail: 'user1@crowdserve.com',
        status: 0,
        createdAt: '2022-12-14 18:30',
        updatedAt: '2022-12-14 18:30',
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: transactionDetailData,
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });
  mock.onGet(API.getUsersList.get).reply(() => {
    const usersListData = [
      {
        id: 1,
        email: 'rick.xu@imaginato.com',
        name: 'BNP Paribas SA',
        walletAddress: '1234 5678 9012 345',
        isActivated: false,
        lastLoginAt: '2022-12-14 18:30',
        createdAt: '2022-12-14 18:30',
      },
      {
        id: 2,
        email: 'rick.xu@imaginato.com',
        name: 'BNP Paribas SA',
        walletAddress: '1234 5678 9012 345',
        isActivated: true,
        lastLoginAt: '2022-12-14 18:30',
        createdAt: '2022-12-14 18:30',
      },
    ];

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              code: 200,
              message: 'OK',
              data: {
                list: usersListData,
                count: 2,
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
    .onGet(new RegExp(`${API.getUserDetail.get}`.replace('{userId}', '(.*)')))
    .reply(() => {
      const userDetailData = {
        id: 2,
        email: 'rick.xu@imaginato.com',
        name: 'BNP Paribas SA',
        walletAddress: '1234 5678 9012 345',
        isActivated: true,
        lastLoginAt: '2022-12-14 18:30',
        createdAt: '2022-12-14 18:30',
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: userDetailData,
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
