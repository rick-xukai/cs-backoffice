import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import API from '../constants/API';
import { Images } from '../theme';
import { EventsListDataType } from '../features/Events/Events.slice';
import { TicketsListDataType } from '../features/Tickets/Tickets.slice';
import { TicketsDetailDataType } from '../features/TicketDetail/TicketDetail.slice';
import { EventDetailDataType } from '../features/EventDetail/EventDetail.slice';
import { TransactionsDataType } from '../features/Transactions/Transactions.slice';
import { UsersListDataType } from '../features/Users/Users.slice';
import { UserDetailDataType } from '../features/UserDetail/UserDetail.slice';

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
    email: 'guest@crowdserve.xyz',
  },
];

const MockAPI = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios);

  // Login API
  mock.onPost(API.login.post).reply((config: any) => {
    const user = JSON.parse(config.data);

    const validUser = Users.filter(
      (usr) => usr.email === user.email && usr.password === user.password,
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
            role: '0',
            email: validUser[0].email,
            status: 1,
          };
          const validUserObj = { ...userObj, ...tokenObj }; // validUser Obj

          resolve([
            200,
            {
              code: 200,
              message: 'OK',
              data: {
                token: ACCESS_TOKEN,
                user: validUserObj,
              },
            },
          ]);
        } else {
          reject(new Error('Username and password are invalid.'));
        }
      }, 2000);
    });
  });

  // Register API
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

  // Events List API - 匹配 EventsListDataType
  mock.onGet(API.getEventsList.get).reply((config: any) => {
    const { params } = config;
    let eventsListData: EventsListDataType[] = [
      {
        id: '1',
        name: 'CrowdServe Annual Conference 2024',
        image: Images.TestImg,
        updatedAt: '2024-01-15T10:30:00Z',
        location: 'Singapore Convention Centre',
        organizerName: 'CrowdServe Events',
        partnerName: 'Tech Partners Ltd',
        status: 1, // upcoming
        revenue: 25000.5,
        soldTotal: 150,
        total: 300,
        time: '2024-03-15T09:00:00Z',
        slug: 'crowdserve-annual-conference-2024',
        hidden: false,
        onControl: true,
        canSell: true,
        canTransfer: true,
      },
      {
        id: '2',
        name: 'Blockchain Summit Singapore',
        image: Images.TestImg,
        updatedAt: '2024-01-10T14:20:00Z',
        location: 'Marina Bay Sands',
        organizerName: 'Blockchain Events Asia',
        partnerName: 'Crypto Alliance',
        status: 1, // upcoming
        revenue: 45000.75,
        soldTotal: 275,
        total: 500,
        time: '2024-04-20T08:30:00Z',
        slug: 'blockchain-summit-singapore',
        hidden: false,
        onControl: true,
        canSell: true,
        canTransfer: false,
      },
      {
        id: '3',
        name: 'Music Festival 2024',
        image: Images.TestImg,
        updatedAt: '2024-01-05T16:45:00Z',
        location: 'Sentosa Island',
        organizerName: 'Music Events Pte Ltd',
        partnerName: 'Sound Partners',
        status: 2, // ended
        revenue: 120000.0,
        soldTotal: 800,
        total: 1000,
        time: '2024-02-10T18:00:00Z',
        slug: 'music-festival-2024',
        hidden: false,
        onControl: false,
        canSell: false,
        canTransfer: true,
      },
    ];

    if (params.page === 2) {
      const eventsListDataEnded: EventsListDataType[] = [];
      eventsListData.forEach((item, index) => {
        if (index <= 4) {
          eventsListDataEnded.push({ ...item, status: 3 }); // cancelled
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
              code: 200,
              message: 'OK',
              data: {
                list: eventsListData,
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

  // Tickets List API - 匹配 TicketsListDataType
  mock.onGet(API.getTicketsList.get).reply((config: any) => {
    const { params } = config;
    let ticketsListData: TicketsListDataType[] = [
      {
        id: 1,
        createdAt: '2024-01-15T08:19:48.623Z',
        price: 150.0,
        seat: 5,
        status: 0, // active
        ticketNo: 'CS2024001',
        ticketType: 'VIP Premium',
        userEmail: 'john.doe@example.com',
        userId: 101,
        userName: 'John Doe',
      },
      {
        id: 2,
        createdAt: '2024-01-14T09:30:22.123Z',
        price: 85.5,
        seat: 12,
        status: 1, // used
        ticketNo: 'CS2024002',
        ticketType: 'Standard',
        userEmail: 'jane.smith@example.com',
        userId: 102,
        userName: 'Jane Smith',
      },
      {
        id: 3,
        createdAt: '2024-01-13T15:45:12.456Z',
        price: 200.0,
        seat: 1,
        status: 0, // active
        ticketNo: 'CS2024003',
        ticketType: 'VIP Premium Plus',
        userEmail: 'bob.wilson@example.com',
        userId: 103,
        userName: 'Bob Wilson',
      },
    ];

    // 添加更多测试数据
    for (let i = 4; i <= 20; i += 1) {
      ticketsListData.push({
        id: i,
        createdAt: `2024-01-${String(20 - i).padStart(2, '0')}T${String(
          8 + (i % 12),
        ).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:${String(
          (i * 13) % 60,
        ).padStart(2, '0')}.000Z`,
        price: 50 + i * 10,
        seat: i + 10,
        status: i % 3, // 0=active, 1=used, 2=cancelled
        ticketNo: `CS2024${String(i).padStart(3, '0')}`,
        ticketType: i % 2 === 0 ? 'VIP Premium' : 'Standard',
        userEmail: `user${i}@example.com`,
        userId: 100 + i,
        userName: `User ${i}`,
      });
    }

    if (params.page === 2) {
      const ticketsListDataPage2: TicketsListDataType[] = [];
      ticketsListData.forEach((item, index) => {
        if (index >= 10 && index < 20) {
          ticketsListDataPage2.push({ ...item, status: 2 }); // cancelled
        }
      });
      ticketsListData = ticketsListDataPage2;
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
                list: ticketsListData.slice(0, 10), // 分页返回前10条
                count: ticketsListData.length,
              },
            },
          ]);
        }, 2000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // Event Detail API - 匹配 EventDetailDataType
  mock
    .onGet(
      new RegExp(`${API.getEventsDetail.get}`.replace('{eventId}', '(.*)')),
    )
    .reply(() => {
      const eventDetailData: EventDetailDataType = {
        id: 1,
        name: 'CrowdServe Annual Conference 2024',
        description:
          'Join us for the biggest blockchain and tech conference in Southeast Asia. Featuring keynote speakers, panel discussions, and networking opportunities with industry leaders.',
        organizerName: 'CrowdServe Events',
        organizerId: 1,
        image: Images.TestImg,
        location: 'Singapore Convention Centre, Hall A',
        startTime: '2024-03-15T09:00:00.000Z',
        endTime: '2024-03-15T18:00:00.000Z',
        scannerLink: 'https://crowdserve.xyz/scanner/event/1',
        uuid: 'cs-event-001-2024',
        status: 1,
        descriptionImages: [
          {
            image: Images.TestImg,
            size: 'large',
          },
          {
            image: Images.TestImg,
            size: 'medium',
          },
        ],
        discounts: [
          {
            id: '1',
            type: 0, // PromoType.code
            name: 'Early Bird Discount',
            code: 'EARLY2024',
            discount: {
              type: 0, // DiscountType.percentage
              value: 20,
            },
            quantity: 100,
            method: 1, // MethodType.discount
            condition: {
              ticketTypeId: undefined,
              quantity: undefined,
            },
            gift: {
              ticketTypeId: undefined,
              quantity: undefined,
            },
            apply: {
              type: 0, // ApplyCodeToType.all
              ticketTypeIds: [],
            },
            usageCount: 15,
          },
        ],
        ticketTypes: [
          {
            id: 1,
            name: 'VIP Premium',
            description:
              'Access to all sessions, VIP lounge, lunch, and networking dinner',
            price: 150.0,
            stock: 50,
            soldTotal: 15,
            ceilingPrice: 200.0,
            purchaseLimit: 2,
            image: Images.TestImg,
            imageType: 'image/jpeg',
            imageName: 'vip-premium-image.jpg',
            thumbnailUrl: Images.TestImg,
            thumbnailType: 'image/jpeg',
            thumbnailName: 'vip-premium-thumbnail.jpg',
            externalLink: 'https://crowdserve.xyz/ticket/vip',
            blockchainUrl: 'https://opensea.io/collection/crowdserve-vip',
            royaltiesFee: 5.0,
            absorbFees: true,
            sellStartTime: '2024-01-15T10:00:00.000Z',
            sellEndTime: '2024-03-14T23:59:00.000Z',
            visibility: true,
            connectedTickets: [],
          },
          {
            id: 2,
            name: 'Standard',
            description: 'Access to main sessions and lunch',
            price: 85.5,
            stock: 200,
            soldTotal: 45,
            ceilingPrice: 120.0,
            purchaseLimit: 5,
            image: Images.TestImg,
            imageType: 'image/jpeg',
            imageName: 'standard-image.jpg',
            thumbnailUrl: Images.TestImg,
            thumbnailType: 'image/jpeg',
            thumbnailName: 'standard-thumbnail.jpg',
            externalLink: 'https://crowdserve.xyz/ticket/standard',
            blockchainUrl: 'https://opensea.io/collection/crowdserve-standard',
            royaltiesFee: 2.5,
            absorbFees: true,
            sellStartTime: '2024-01-15T10:00:00.000Z',
            sellEndTime: '2024-03-14T23:59:00.000Z',
            visibility: true,
            connectedTickets: [],
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: eventDetailData,
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // List Ticket Type API - 匹配 ListTicketType[]
  mock.onGet(API.getListTicketType.get).reply(() => {
    const listTicketTypeData = [
      {
        id: 1,
        name: 'VIP Premium',
        eventName: 'CrowdServe Annual Conference 2024',
      },
      {
        id: 2,
        name: 'Standard',
        eventName: 'CrowdServe Annual Conference 2024',
      },
      {
        id: 3,
        name: 'Early Bird',
        eventName: 'Blockchain Summit Singapore',
      },
      {
        id: 4,
        name: 'General Admission',
        eventName: 'Music Festival 2024',
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
              data: listTicketTypeData,
            },
          ]);
        }, 1000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // Ticket Sold List API - 匹配 TicketSoldListItemProps[]
  mock
    .onGet(
      new RegExp(`${API.getTicketSoldList.get}`.replace(':event_id', '(.*)')),
    )
    .reply(() => {
      const ticketSoldListData = [
        {
          id: 1,
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
          ticketType: {
            name: 'VIP Premium',
          },
          total: 150.0,
          price: 150.0,
          discount: 0,
          absorbFees: 7.5,
          organizerAbsorbFees: 0,
          paymentFees: 0,
          seat: 5,
          ticketNo: 'CS2024001',
          status: 0, // active
          source: 0, // primary market
          createdAt: '2024-01-15T08:19:48.623Z',
          saleStatus: 0,
          promoCode: null,
        },
        {
          id: 2,
          user: {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
          },
          ticketType: {
            name: 'Standard',
          },
          total: 85.5,
          price: 100.0,
          discount: 14.5,
          absorbFees: 4.25,
          organizerAbsorbFees: 0,
          paymentFees: 0,
          seat: 12,
          ticketNo: 'CS2024002',
          status: 1, // used
          source: 0, // primary market
          createdAt: '2024-01-14T09:30:22.123Z',
          saleStatus: 1,
          promoCode: 'EARLY2024',
        },
        {
          id: 3,
          user: {
            name: 'Bob Wilson',
            email: 'bob.wilson@example.com',
            firstName: 'Bob',
            lastName: 'Wilson',
          },
          ticketType: {
            name: 'VIP Premium',
          },
          total: 200.0,
          price: 150.0,
          discount: 0,
          absorbFees: 10.0,
          organizerAbsorbFees: 0,
          paymentFees: 0,
          seat: 1,
          ticketNo: 'CS2024003',
          status: 0, // active
          source: 1, // secondary market
          createdAt: '2024-01-13T15:45:12.456Z',
          saleStatus: 0,
          promoCode: null,
        },
        {
          id: 4,
          user: {
            name: 'Alice Brown',
            email: 'alice.brown@example.com',
            firstName: 'Alice',
            lastName: 'Brown',
          },
          ticketType: {
            name: 'Standard',
          },
          total: 85.5,
          price: 85.5,
          discount: 0,
          absorbFees: 4.25,
          organizerAbsorbFees: 0,
          paymentFees: 0,
          seat: 8,
          ticketNo: 'CS2024004',
          status: 2, // cancelled
          source: 0, // primary market
          createdAt: '2024-01-12T11:20:30.789Z',
          saleStatus: 2,
          promoCode: null,
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
                  list: ticketSoldListData,
                  count: ticketSoldListData.length,
                },
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Ticket Sold Count API - 匹配 TicketSoldCountItemProps
  mock
    .onGet(
      new RegExp(`${API.getTicketSoldCount.get}`.replace(':eventId', '(.*)')),
    )
    .reply(() => {
      const ticketSoldCountData = {
        id: '1',
        name: 'CrowdServe Annual Conference 2024',
        stocks: {
          soldTotal: 60,
          importTotal: 5,
          cancelTotal: 1,
        },
        ticketTypes: [
          {
            id: 1,
            name: 'VIP Premium',
          },
          {
            id: 2,
            name: 'Standard',
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: ticketSoldCountData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Ticket Detail API - 匹配 TicketsDetailDataType
  mock
    .onGet(
      new RegExp(`${API.ticketsDetail.get}`.replace('{userTicketId}', '(.*)')),
    )
    .reply(() => {
      const ticketsDetailData: TicketsDetailDataType = {
        id: 1,
        cancelledAt: '',
        createdAt: '2024-01-15T08:19:48.623Z',
        event: {
          description:
            'Join us for the biggest blockchain and tech conference in Southeast Asia.',
          endTime: '2024-03-15T18:00:00.000Z',
          id: 1,
          location: 'Singapore Convention Centre, Hall A',
          name: 'CrowdServe Annual Conference 2024',
          startTime: '2024-03-15T09:00:00.000Z',
        },
        organizerName: 'CrowdServe Events',
        price: 150.0,
        redeemedAt: '',
        seat: 5,
        status: 0, // active
        ticketNo: 'CS2024001',
        ticketType: 'VIP Premium',
        updatedAt: '2024-01-15T08:19:48.623Z',
        userEmail: 'john.doe@example.com',
        userId: 101,
        userName: 'John Doe',
        collectionAddress: '0x1234567890abcdef1234567890abcdef12345678',
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: ticketsDetailData,
              },
            ]);
          }, 2000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Update Ticket Status API
  mock
    .onPut(
      new RegExp(`${API.ticketsDetail.put}`.replace('{userTicketId}', '(.*)')),
    )
    .reply(
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

  // Transactions List API - 匹配 TransactionsDataType
  mock.onGet(API.getTransactionsList.get).reply((config: any) => {
    const { params } = config;
    let transactionsListData: TransactionsDataType[] = [
      {
        id: '1',
        userEmail: 'john.doe@example.com',
        bankName: 'DBS Bank',
        cardHolder: 'John Doe',
        cardNo: '1234 5678 9012 3456',
        amount: 500.0,
        currency: 'SGD',
        status: 0, // pending
        createdAt: '2024-01-15T14:30:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        swiftCode: 'DBSSSGSG',
      },
      {
        id: '2',
        userEmail: 'jane.smith@example.com',
        bankName: 'OCBC Bank',
        cardHolder: 'Jane Smith',
        cardNo: '2345 6789 0123 4567',
        amount: 750.5,
        currency: 'SGD',
        status: 1, // completed
        createdAt: '2024-01-14T16:45:00Z',
        updatedAt: '2024-01-15T09:20:00Z',
        swiftCode: 'OCBCSGSG',
      },
      {
        id: '3',
        userEmail: 'bob.wilson@example.com',
        bankName: 'UOB Bank',
        cardHolder: 'Bob Wilson',
        cardNo: '3456 7890 1234 5678',
        amount: 1200.25,
        currency: 'SGD',
        status: 0, // pending
        createdAt: '2024-01-13T11:15:00Z',
        updatedAt: '2024-01-13T11:15:00Z',
        swiftCode: 'UOVBSGSG',
      },
    ];

    // 添加更多测试数据
    for (let i = 4; i <= 20; i += 1) {
      let bankName = 'UOB Bank';
      let swiftCode = 'UOVBSGSG';

      if (i % 3 === 0) {
        bankName = 'DBS Bank';
        swiftCode = 'DBSSSGSG';
      } else if (i % 3 === 1) {
        bankName = 'OCBC Bank';
        swiftCode = 'OCBCSGSG';
      }

      transactionsListData.push({
        id: String(i),
        userEmail: `user${i}@example.com`,
        bankName,
        cardHolder: `User ${i}`,
        cardNo: `${1000 + i} ${2000 + i} ${3000 + i} ${4000 + i}`,
        amount: 100 + i * 25.5,
        currency: 'SGD',
        status: i % 2, // 0=pending, 1=completed
        createdAt: `2024-01-${String(20 - i).padStart(2, '0')}T${String(
          8 + (i % 12),
        ).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00Z`,
        updatedAt: `2024-01-${String(20 - i).padStart(2, '0')}T${String(
          9 + (i % 12),
        ).padStart(2, '0')}:${String((i * 7) % 60).padStart(2, '0')}:00Z`,
        swiftCode,
      });
    }

    if (params.page === 2) {
      const transactionsPage2 = transactionsListData
        .slice(10, 20)
        .map((item) => ({
          ...item,
          status: 1, // completed
        }));
      transactionsListData = transactionsPage2;
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
                list: transactionsListData.slice(0, 10),
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

  // Create Transaction API
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

  // Transaction Detail API
  mock
    .onGet(
      new RegExp(`${API.transactions.get}`.replace('{transactionId}', '(.*)')),
    )
    .reply(() => {
      const transactionDetailData: TransactionsDataType = {
        id: '1',
        userEmail: 'john.doe@example.com',
        bankName: 'DBS Bank',
        cardHolder: 'John Doe',
        cardNo: '1234 5678 9012 3456',
        amount: 500.0,
        currency: 'SGD',
        status: 0, // pending
        createdAt: '2024-01-15T14:30:00Z',
        updatedAt: '2024-01-15T14:30:00Z',
        swiftCode: 'DBSSSGSG',
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

  // Users List API - 匹配 UsersListDataType
  mock.onGet(API.getUsersList.get).reply(() => {
    const usersListData: UsersListDataType[] = [
      {
        id: '1',
        createdAt: '2024-01-01T10:00:00Z',
        email: 'john.doe@example.com',
        isActivated: 'true',
        lastLoginAt: '2024-01-15T14:30:00Z',
        name: 'John Doe',
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        birthday: '1990-05-15',
        gender: 'Male',
      },
      {
        id: '2',
        createdAt: '2024-01-02T11:30:00Z',
        email: 'jane.smith@example.com',
        isActivated: 'true',
        lastLoginAt: '2024-01-14T16:45:00Z',
        name: 'Jane Smith',
        walletAddress: '0x2345678901bcdef12345678901bcdef123456789',
        birthday: '1988-08-22',
        gender: 'Female',
      },
      {
        id: '3',
        createdAt: '2024-01-03T09:15:00Z',
        email: 'bob.wilson@example.com',
        isActivated: 'false',
        lastLoginAt: '2024-01-10T12:20:00Z',
        name: 'Bob Wilson',
        walletAddress: '0x3456789012cdef123456789012cdef1234567890',
        birthday: '1992-12-03',
        gender: 'Male',
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
                count: 3,
              },
            },
          ]);
        }, 2000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // User Detail API - 匹配 UserDetailDataType
  mock
    .onGet(new RegExp(`${API.getUserDetail.get}`.replace('{userId}', '(.*)')))
    .reply(() => {
      const userDetailData: UserDetailDataType = {
        id: 1,
        createdAt: '2024-01-01T10:00:00Z',
        email: 'john.doe@example.com',
        isActivated: true,
        lastLoginAt: '2024-01-15T14:30:00Z',
        name: 'John Doe',
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        birthday: '1990-05-15',
        gender: 'Male',
        country: 'Singapore',
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+65 9123 4567',
        profileImage: Images.TestImg,
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

  // Unique Buyers API - 匹配 UniqueBuyersDataType[]
  mock
    .onGet(new RegExp(`${API.getUnqiueBuyers.get}`.replace(':eventId', '(.*)')))
    .reply(() => {
      const uniqueBuyersData = [
        {
          firstName: 'John',
          lastName: 'Doe',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownedTickets: 2,
          gender: 'Male',
          birthday: '1990-05-15',
          isActivated: true,
          updatedAt: '2024-01-15T08:19:48.623Z',
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          ownedTickets: 1,
          gender: 'Female',
          birthday: '1988-08-22',
          isActivated: true,
          updatedAt: '2024-01-14T09:30:22.123Z',
        },
        {
          firstName: 'Bob',
          lastName: 'Wilson',
          name: 'Bob Wilson',
          email: 'bob.wilson@example.com',
          ownedTickets: 3,
          gender: 'Male',
          birthday: '1992-12-03',
          isActivated: false,
          updatedAt: '2024-01-13T15:45:12.456Z',
        },
        {
          firstName: 'Alice',
          lastName: 'Brown',
          name: 'Alice Brown',
          email: 'alice.brown@example.com',
          ownedTickets: 0,
          gender: 'Female',
          birthday: '1995-03-10',
          isActivated: true,
          updatedAt: '2024-01-12T11:20:30.789Z',
        },
        {
          firstName: 'Charlie',
          lastName: 'Davis',
          name: 'Charlie Davis',
          email: 'charlie.davis@example.com',
          ownedTickets: 1,
          gender: 'Other',
          birthday: '1987-11-18',
          isActivated: true,
          updatedAt: '2024-01-11T14:35:15.321Z',
        },
        {
          firstName: 'Emily',
          lastName: 'Johnson',
          name: 'Emily Johnson',
          email: 'emily.johnson@example.com',
          ownedTickets: 2,
          gender: 'Female',
          birthday: '1993-06-25',
          isActivated: true,
          updatedAt: '2024-01-10T16:42:33.567Z',
        },
        {
          firstName: 'Michael',
          lastName: 'Lee',
          name: 'Michael Lee',
          email: 'michael.lee@example.com',
          ownedTickets: 1,
          gender: 'Male',
          birthday: '1985-09-12',
          isActivated: true,
          updatedAt: '2024-01-09T12:18:21.890Z',
        },
        {
          firstName: 'Sarah',
          lastName: 'Wang',
          name: 'Sarah Wang',
          email: 'sarah.wang@example.com',
          ownedTickets: 4,
          gender: 'Female',
          birthday: '1991-02-08',
          isActivated: true,
          updatedAt: '2024-01-08T09:55:14.234Z',
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
                data: uniqueBuyersData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Unique Buyers Charts API - 匹配 ChartsDataType
  mock
    .onGet(
      new RegExp(
        `${API.getUniqueBuyersCharts.get}`.replace(':eventId', '(.*)'),
      ),
    )
    .reply(() => {
      const uniqueBuyersChartsData = {
        id: 1,
        name: 'CrowdServe Annual Conference 2024',
        summary: {
          userCount: 275,
          conversionRate: 0.68, // 68%
        },
        countries: [
          {
            name: 'Singapore',
            count: 120,
          },
          {
            name: 'Malaysia',
            count: 65,
          },
          {
            name: 'Indonesia',
            count: 45,
          },
          {
            name: 'Thailand',
            count: 25,
          },
          {
            name: 'Philippines',
            count: 15,
          },
          {
            name: 'Vietnam',
            count: 5,
          },
        ],
        genders: [
          {
            name: 'Male',
            count: 155,
          },
          {
            name: 'Female',
            count: 110,
          },
          {
            name: 'Other',
            count: 10,
          },
        ],
        ages: [
          {
            name: '18-22',
            count: 25,
          },
          {
            name: '23-27',
            count: 45,
          },
          {
            name: '28-32',
            count: 65,
          },
          {
            name: '33-37',
            count: 55,
          },
          {
            name: '38-42',
            count: 40,
          },
          {
            name: '43-47',
            count: 25,
          },
          {
            name: '48-52',
            count: 15,
          },
          {
            name: '53+',
            count: 5,
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: uniqueBuyersChartsData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Event Page View API - 匹配 EventPageViewsDataType
  mock
    .onGet(
      new RegExp(`${API.getEventPageView.get}`.replace(':eventId', '(.*)')),
    )
    .reply(() => {
      const eventPageViewData = {
        id: '1',
        name: 'CrowdServe Annual Conference 2024',
        summary: {
          viewCount: 4850,
          averageDailyCount: 185.5,
        },
        countries: [
          {
            name: 'Singapore',
            count: 2375, // 49%
            rate: 0.49,
          },
          {
            name: 'Malaysia',
            count: 873, // 18%
            rate: 0.18,
          },
          {
            name: 'Indonesia',
            count: 679, // 14%
            rate: 0.14,
          },
          {
            name: 'Thailand',
            count: 485, // 10%
            rate: 0.1,
          },
          {
            name: 'Philippines',
            count: 291, // 6%
            rate: 0.06,
          },
          {
            name: 'Vietnam',
            count: 97, // 2%
            rate: 0.02,
          },
          {
            name: 'Others',
            count: 50, // 1%
            rate: 0.01,
          },
        ],
        origins: [
          {
            name: 'Direct',
            count: 1940, // 40%
          },
          {
            name: 'Social Media',
            count: 1455, // 30%
          },
          {
            name: 'Search Engines',
            count: 970, // 20%
          },
          {
            name: 'Email Marketing',
            count: 485, // 10%
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: eventPageViewData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Event Page View Analysis API - 匹配 EventPageViewsAnalysisDataType[]
  mock
    .onGet(
      new RegExp(
        `${API.getEventPageViewAnalysis.get}`.replace(':eventId', '(.*)'),
      ),
    )
    .reply(() => {
      const eventPageViewAnalysisData = [
        {
          date: '2024-01-01',
          pageViewTotal: 80,
          pageViewUserCount: 55,
          ticketSoldCount: 3,
        },
        {
          date: '2024-01-02',
          pageViewTotal: 95,
          pageViewUserCount: 68,
          ticketSoldCount: 5,
        },
        {
          date: '2024-01-03',
          pageViewTotal: 110,
          pageViewUserCount: 82,
          ticketSoldCount: 7,
        },
        {
          date: '2024-01-04',
          pageViewTotal: 125,
          pageViewUserCount: 95,
          ticketSoldCount: 9,
        },
        {
          date: '2024-01-05',
          pageViewTotal: 140,
          pageViewUserCount: 105,
          ticketSoldCount: 12,
        },
        {
          date: '2024-01-06',
          pageViewTotal: 88,
          pageViewUserCount: 65,
          ticketSoldCount: 4,
        },
        {
          date: '2024-01-07',
          pageViewTotal: 92,
          pageViewUserCount: 70,
          ticketSoldCount: 6,
        },
        {
          date: '2024-01-08',
          pageViewTotal: 155,
          pageViewUserCount: 118,
          ticketSoldCount: 14,
        },
        {
          date: '2024-01-09',
          pageViewTotal: 170,
          pageViewUserCount: 130,
          ticketSoldCount: 16,
        },
        {
          date: '2024-01-10',
          pageViewTotal: 185,
          pageViewUserCount: 142,
          ticketSoldCount: 18,
        },
        {
          date: '2024-01-11',
          pageViewTotal: 200,
          pageViewUserCount: 155,
          ticketSoldCount: 20,
        },
        {
          date: '2024-01-12',
          pageViewTotal: 215,
          pageViewUserCount: 165,
          ticketSoldCount: 22,
        },
        {
          date: '2024-01-13',
          pageViewTotal: 98,
          pageViewUserCount: 75,
          ticketSoldCount: 8,
        },
        {
          date: '2024-01-14',
          pageViewTotal: 105,
          pageViewUserCount: 80,
          ticketSoldCount: 10,
        },
        {
          date: '2024-01-15',
          pageViewTotal: 230,
          pageViewUserCount: 175,
          ticketSoldCount: 25,
        },
        {
          date: '2024-01-16',
          pageViewTotal: 245,
          pageViewUserCount: 185,
          ticketSoldCount: 28,
        },
        {
          date: '2024-01-17',
          pageViewTotal: 260,
          pageViewUserCount: 195,
          ticketSoldCount: 30,
        },
        {
          date: '2024-01-18',
          pageViewTotal: 275,
          pageViewUserCount: 205,
          ticketSoldCount: 32,
        },
        {
          date: '2024-01-19',
          pageViewTotal: 290,
          pageViewUserCount: 215,
          ticketSoldCount: 35,
        },
        {
          date: '2024-01-20',
          pageViewTotal: 115,
          pageViewUserCount: 88,
          ticketSoldCount: 12,
        },
        {
          date: '2024-01-21',
          pageViewTotal: 122,
          pageViewUserCount: 95,
          ticketSoldCount: 14,
        },
        {
          date: '2024-01-22',
          pageViewTotal: 305,
          pageViewUserCount: 225,
          ticketSoldCount: 38,
        },
        {
          date: '2024-01-23',
          pageViewTotal: 320,
          pageViewUserCount: 235,
          ticketSoldCount: 40,
        },
        {
          date: '2024-01-24',
          pageViewTotal: 335,
          pageViewUserCount: 245,
          ticketSoldCount: 42,
        },
        {
          date: '2024-01-25',
          pageViewTotal: 350,
          pageViewUserCount: 255,
          ticketSoldCount: 45,
        },
        {
          date: '2024-01-26',
          pageViewTotal: 365,
          pageViewUserCount: 265,
          ticketSoldCount: 48,
        },
        {
          date: '2024-01-27',
          pageViewTotal: 140,
          pageViewUserCount: 108,
          ticketSoldCount: 16,
        },
        {
          date: '2024-01-28',
          pageViewTotal: 155,
          pageViewUserCount: 118,
          ticketSoldCount: 18,
        },
        {
          date: '2024-01-29',
          pageViewTotal: 380,
          pageViewUserCount: 275,
          ticketSoldCount: 50,
        },
        {
          date: '2024-01-30',
          pageViewTotal: 395,
          pageViewUserCount: 285,
          ticketSoldCount: 52,
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
                data: eventPageViewAnalysisData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Unique Attendees API - 匹配 UniqueAttendeesDataType[]
  mock
    .onGet(
      new RegExp(`${API.getUnqiueAttendees.get}`.replace(':eventId', '(.*)')),
    )
    .reply(() => {
      const uniqueAttendeesData = [
        {
          name: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          ownedTickets: 2,
          gender: 'Male',
          birthday: '1990-05-15',
          isActivated: true,
          updatedAt: '2024-01-15T08:19:48.623Z',
        },
        {
          name: 'Jane Smith',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          ownedTickets: 1,
          gender: 'Female',
          birthday: '1988-08-22',
          isActivated: true,
          updatedAt: '2024-01-14T09:30:22.123Z',
        },
        {
          name: 'Bob Wilson',
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob.wilson@example.com',
          ownedTickets: 3,
          gender: 'Male',
          birthday: '1992-12-03',
          isActivated: false,
          updatedAt: '2024-01-13T15:45:12.456Z',
        },
        {
          name: 'Alice Brown',
          firstName: 'Alice',
          lastName: 'Brown',
          email: 'alice.brown@example.com',
          ownedTickets: 1,
          gender: 'Female',
          birthday: '1995-03-10',
          isActivated: true,
          updatedAt: '2024-01-12T11:20:30.789Z',
        },
        {
          name: 'Charlie Davis',
          firstName: 'Charlie',
          lastName: 'Davis',
          email: 'charlie.davis@example.com',
          ownedTickets: 0,
          gender: 'Other',
          birthday: '1987-11-18',
          isActivated: true,
          updatedAt: '2024-01-11T14:35:15.321Z',
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
                data: uniqueAttendeesData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Event Scanned API - 匹配 EventScannedDataType[]
  mock
    .onGet(new RegExp(`${API.getEventScanned.get}`.replace(':eventId', '(.*)')))
    .reply(() => {
      const eventScannedData = [
        {
          name: 'John Doe',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          ticketNo: 'CS2024001',
          ticketType: 'VIP Premium',
          seat: '5',
          source: 0, // primary
        },
        {
          name: 'Jane Smith',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          ticketNo: 'CS2024002',
          ticketType: 'Standard',
          seat: '12',
          source: 0, // primary
        },
        {
          name: 'Bob Wilson',
          firstName: 'Bob',
          lastName: 'Wilson',
          email: 'bob.wilson@example.com',
          ticketNo: 'CS2024003',
          ticketType: 'VIP Premium',
          seat: '1',
          source: 1, // secondary
        },
        {
          name: 'Alice Brown',
          firstName: 'Alice',
          lastName: 'Brown',
          email: 'alice.brown@example.com',
          ticketNo: 'CS2024004',
          ticketType: 'Standard',
          seat: '8',
          source: 2, // import
        },
        {
          name: 'Charlie Davis',
          firstName: 'Charlie',
          lastName: 'Davis',
          email: 'charlie.davis@example.com',
          ticketNo: 'CS2024005',
          ticketType: 'Early Bird',
          seat: '15',
          source: 4, // transferred
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
                data: eventScannedData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Unique Attendees Summary API - 匹配 UniqueAttendeesSummaryDataType
  mock
    .onGet(
      new RegExp(
        `${API.getUnqiueAttendeesSummary.get}`.replace(':eventId', '(.*)'),
      ),
    )
    .reply(() => {
      const uniqueAttendeesSummaryData = {
        attendeesCount: 125,
        scannedCount: 85,
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: uniqueAttendeesSummaryData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Event Dashboard API - 匹配 EventDashboardDataType
  mock
    .onGet(
      new RegExp(`${API.getEventDashboard.get}`.replace(':event_id', '(.*)')),
    )
    .reply(() => {
      const eventDashboardData = {
        id: '1',
        name: 'CrowdServe Annual Conference 2024',
        startTime: '2024-03-15T09:00:00.000Z',
        endTime: '2024-03-15T18:00:00.000Z',
        publishTime: '2024-01-15T10:00:00.000Z',
        image: Images.TestImg,
        status: 1, // active/upcoming
        stocks: {
          stockTotal: 500,
          soldTotal: 325,
          importTotal: 15,
        },
        buyers: {
          userCount: 275,
          conversionRate: 0.68, // 68%
        },
        pageViews: {
          viewCount: 4850,
          averageDailyCount: 185.5,
        },
        netSales: {
          revenue: 48750.0,
          grossSales: 52250.0,
        },
        attendees: {
          ticketScanned: 195,
          uniqueUser: 180,
        },
        ticketTypes: [
          {
            name: 'VIP Premium',
            image: Images.TestImg,
            stock: 100,
            soldTotal: 75,
            importTotal: 5,
          },
          {
            name: 'Standard',
            image: Images.TestImg,
            stock: 300,
            soldTotal: 220,
            importTotal: 8,
          },
          {
            name: 'Early Bird',
            image: Images.TestImg,
            stock: 100,
            soldTotal: 30,
            importTotal: 2,
          },
        ],
        discounts: [
          {
            name: 'Early Bird 20% Off',
            usageCount: 45,
            limit: 100,
          },
          {
            name: 'Student Discount',
            usageCount: 28,
            limit: 50,
          },
          {
            name: 'Group Booking 15% Off',
            usageCount: 12,
            limit: 30,
          },
        ],
      };

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: eventDashboardData,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Emails List API - 匹配 EmailListProps[]
  mock.onGet(API.getEmailsList.get).reply((config: any) => {
    const { params } = config;
    let emailsListData = [
      {
        id: 1,
        event: {
          id: 1,
          name: 'CrowdServe Annual Conference 2024',
          image: Images.TestImg,
          startTime: '2024-03-15T09:00:00.000Z',
          endTime: '2024-03-15T18:00:00.000Z',
          timezone: 'Asia/Singapore',
        },
        subject: 'Welcome to CrowdServe Annual Conference 2024!',
        isDefault: true,
        sendTime: '2024-03-14T09:00:00.000Z',
        status: 1, // sent
      },
      {
        id: 2,
        event: {
          id: 2,
          name: 'Blockchain Summit Singapore',
          image: Images.TestImg,
          startTime: '2024-04-20T08:30:00.000Z',
          endTime: '2024-04-20T18:00:00.000Z',
          timezone: 'Asia/Singapore',
        },
        subject: 'Reminder: Blockchain Summit Singapore Tomorrow',
        isDefault: false,
        sendTime: '2024-04-19T10:00:00.000Z',
        status: 0, // scheduled
      },
      {
        id: 3,
        event: {
          id: 3,
          name: 'Music Festival 2024',
          image: Images.TestImg,
          startTime: '2024-02-10T18:00:00.000Z',
          endTime: '2024-02-11T02:00:00.000Z',
          timezone: 'Asia/Singapore',
        },
        subject: 'Thank you for attending Music Festival 2024',
        isDefault: false,
        sendTime: '2024-02-11T10:00:00.000Z',
        status: 1, // sent
      },
      {
        id: 4,
        event: {
          id: 1,
          name: 'CrowdServe Annual Conference 2024',
          image: Images.TestImg,
          startTime: '2024-03-15T09:00:00.000Z',
          endTime: '2024-03-15T18:00:00.000Z',
          timezone: 'Asia/Singapore',
        },
        subject: 'Important Updates for CrowdServe Conference',
        isDefault: false,
        sendTime: '2024-03-10T14:00:00.000Z',
        status: 2, // draft
      },
    ];

    // 根据状态筛选
    if (params.status !== undefined && params.status !== null) {
      emailsListData = emailsListData.filter(
        (item) => item.status === Number(params.status),
      );
    }

    // 根据关键词筛选
    if (params.keyword) {
      emailsListData = emailsListData.filter(
        (item) =>
          item.subject.toLowerCase().includes(params.keyword.toLowerCase()) ||
          item.event.name.toLowerCase().includes(params.keyword.toLowerCase()),
      );
    }

    const startIndex = (params.page - 1) * params.size;
    const endIndex = startIndex + params.size;
    const paginatedData = emailsListData.slice(startIndex, endIndex);

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              code: 200,
              message: 'OK',
              data: {
                list: paginatedData,
                count: emailsListData.length,
              },
            },
          ]);
        }, 1000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // Event Reminder List API - 匹配 EventReminderListProps[]
  mock.onGet(API.getEventReminderList.get).reply(() => {
    const eventReminderListData = [
      {
        id: 1,
        name: 'CrowdServe Annual Conference 2024',
        organizerName: 'CrowdServe Events',
        partnerName: 'Tech Partners Ltd',
        address: '1 Raffles Place, Singapore 048616',
        location: 'Singapore Convention Centre',
        time: '2024-03-15T09:00:00.000Z',
      },
      {
        id: 2,
        name: 'Blockchain Summit Singapore',
        organizerName: 'Blockchain Events Asia',
        partnerName: 'Crypto Alliance',
        address: '10 Bayfront Avenue, Singapore 018956',
        location: 'Marina Bay Sands',
        time: '2024-04-20T08:30:00.000Z',
      },
      {
        id: 3,
        name: 'Music Festival 2024',
        organizerName: 'Music Events Pte Ltd',
        partnerName: 'Sound Partners',
        address: 'Sentosa Island, Singapore',
        location: 'Sentosa Island',
        time: '2024-02-10T18:00:00.000Z',
      },
      {
        id: 4,
        name: 'Tech Innovation Summit',
        organizerName: 'Innovation Hub Singapore',
        partnerName: 'TechStart Alliance',
        address: '30 Raffles Place, Singapore 048622',
        location: 'Suntec Singapore',
        time: '2024-05-25T09:30:00.000Z',
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
                list: eventReminderListData,
                count: eventReminderListData.length,
              },
            },
          ]);
        }, 1000);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // Create Email API
  mock.onPost(API.createEmail.post).reply((config: any) => {
    const emailData = JSON.parse(config.data);

    return new Promise((resolve, reject) => {
      if (resolve) {
        setTimeout(() => {
          resolve([
            200,
            {
              code: 200,
              message: 'OK',
              data: {
                id: Math.floor(Math.random() * 1000) + 5, // 生成随机ID
                ...emailData,
              },
            },
          ]);
        }, 1500);
      } else {
        reject(new Error('Something is wrong'));
      }
    });
  });

  // Email Detail API - 匹配 EmailDetailProps
  mock
    .onGet(new RegExp(`${API.getEmailDetail.get}`.replace('{id}', '(.*)')))
    .reply((config: any) => {
      const emailId = config.url.split('/').pop();

      const emailDetailData = {
        1: {
          event: {
            id: 1,
            name: 'CrowdServe Annual Conference 2024',
            organizer: {
              name: 'CrowdServe Events',
            },
            startTime: '2024-03-15T09:00:00.000Z',
            endTime: '2024-03-15T18:00:00.000Z',
            location: 'Singapore Convention Centre',
            address: '1 Raffles Place, Singapore 048616',
            timezone: 'Asia/Singapore',
          },
          subject: 'Welcome to CrowdServe Annual Conference 2024!',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Welcome to CrowdServe Annual Conference 2024!</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Dear Attendee,</h2>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  We are excited to have you join us for this amazing event. Get ready for an incredible experience filled with innovation, networking, and learning opportunities.
                </p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px;">Event Details:</h3>
                  <ul style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Date:</strong> March 15, 2024</li>
                    <li><strong>Time:</strong> 9:00 AM - 6:00 PM (SGT)</li>
                    <li><strong>Location:</strong> Singapore Convention Centre</li>
                    <li><strong>Address:</strong> 1 Raffles Place, Singapore 048616</li>
                  </ul>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  <strong>Important:</strong> Please make sure to arrive 30 minutes early for registration and check-in. Don't forget to bring a valid ID for verification.
                </p>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://crowdserve.xyz/event/1" style="background-color: #667eea; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Event Details</a>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                  We look forward to seeing you there!
                </p>
                
                <p style="color: #666666; font-size: 14px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>CrowdServe Events Team</strong>
                </p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                <p style="color: #999999; font-size: 12px; margin: 0;">
                  Follow us on social media for updates and announcements
                </p>
              </div>
            </div>
          `,
          sendTime: '2024-03-14T09:00:00.000Z',
          organiserEmail: 'organizer@crowdserve.xyz',
          facebookLink: 'https://facebook.com/crowdserve',
          instagramLink: 'https://instagram.com/crowdserve',
          websiteLink: 'https://crowdserve.xyz',
          status: 1, // sent
          isDefault: true,
          recipientCount: 150,
          openRate: 0.85,
          clickRate: 0.42,
        },
        2: {
          event: {
            id: 2,
            name: 'Blockchain Summit Singapore',
            organizer: {
              name: 'Blockchain Events Asia',
            },
            startTime: '2024-04-20T08:30:00.000Z',
            endTime: '2024-04-20T18:00:00.000Z',
            location: 'Marina Bay Sands',
            address: '10 Bayfront Avenue, Singapore 018956',
            timezone: 'Asia/Singapore',
          },
          subject: 'Reminder: Blockchain Summit Singapore Tomorrow',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Don't Forget: Blockchain Summit Tomorrow!</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Hi there! 👋</h2>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  This is a friendly reminder that the <strong>Blockchain Summit Singapore</strong> is happening tomorrow at Marina Bay Sands.
                </p>
                
                <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #856404; font-size: 18px; margin-bottom: 15px;">⏰ Event Schedule:</h3>
                  <ul style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Date:</strong> April 20, 2024 (Tomorrow)</li>
                    <li><strong>Time:</strong> 8:30 AM - 6:00 PM (SGT)</li>
                    <li><strong>Location:</strong> Marina Bay Sands</li>
                    <li><strong>Address:</strong> 10 Bayfront Avenue, Singapore 018956</li>
                  </ul>
                </div>
                
                <div style="background-color: #d1ecf1; border: 1px solid #bee5eb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #0c5460; font-size: 18px; margin-bottom: 15px;">📋 What to Bring:</h3>
                  <ul style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>Your ticket confirmation (digital or printed)</li>
                    <li>Valid photo ID</li>
                    <li>Business cards for networking</li>
                    <li>Notebook and pen for taking notes</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://blockchainevents.asia/summit/2024" style="background-color: #f5576c; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">Event Details</a>
                  <a href="https://maps.google.com/?q=Marina+Bay+Sands+Singapore" style="background-color: #28a745; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Get Directions</a>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                  We look forward to seeing you there for an amazing day of blockchain innovation and networking!
                </p>
                
                <p style="color: #666666; font-size: 14px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>Blockchain Events Asia Team</strong>
                </p>
              </div>
            </div>
          `,
          sendTime: '2024-04-19T10:00:00.000Z',
          organiserEmail: 'contact@blockchainevents.asia',
          facebookLink: 'https://facebook.com/blockchaineventsasia',
          instagramLink: 'https://instagram.com/blockchaineventsasia',
          websiteLink: 'https://blockchainevents.asia',
          status: 0, // scheduled
          isDefault: false,
          recipientCount: 275,
          openRate: 0.0,
          clickRate: 0.0,
        },
        3: {
          event: {
            id: 3,
            name: 'Music Festival 2024',
            organizer: {
              name: 'Music Events Pte Ltd',
            },
            startTime: '2024-02-10T18:00:00.000Z',
            endTime: '2024-02-11T02:00:00.000Z',
            location: 'Sentosa Island',
            address: 'Sentosa Island, Singapore',
            timezone: 'Asia/Singapore',
          },
          subject: 'Thank you for attending Music Festival 2024',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">Thank You for an Amazing Festival! 🎵</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Dear Music Lover,</h2>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  What an incredible night at <strong>Music Festival 2024</strong>! Thank you for being part of this amazing experience that brought together music enthusiasts from all over Southeast Asia.
                </p>
                
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #333333; font-size: 18px; margin-bottom: 15px;">🎤 Festival Highlights:</h3>
                  <ul style="color: #666666; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li>Over 2,000 music fans in attendance</li>
                    <li>12 amazing artists across 3 stages</li>
                    <li>8 hours of non-stop entertainment</li>
                    <li>Unforgettable performances under the stars</li>
                  </ul>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  We hope you enjoyed the performances and made some unforgettable memories. The energy, the music, and the incredible crowd made this festival truly special.
                </p>
                
                <div style="background-color: #e7f3ff; border: 1px solid #b3d9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="color: #0066cc; font-size: 18px; margin-bottom: 15px;">📸 Share Your Memories</h3>
                  <p style="color: #0066cc; font-size: 14px; line-height: 1.6; margin: 0;">
                    Don't forget to share your photos and videos using <strong>#MusicFestival2024</strong> on social media. We'd love to see your favorite moments!
                  </p>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://musicfestival.sg/gallery/2024" style="background-color: #4facfe; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">View Photo Gallery</a>
                  <a href="https://musicfestival.sg/newsletter" style="background-color: #28a745; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Subscribe for Updates</a>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  Stay tuned for our next event announcements! We're already planning something even more spectacular for next year.
                </p>
                
                <p style="color: #666666; font-size: 14px; margin-top: 30px;">
                  Keep the music alive! 🎶<br>
                  <strong>Music Festival Team</strong>
                </p>
              </div>
            </div>
          `,
          sendTime: '2024-02-11T10:00:00.000Z',
          organiserEmail: 'hello@musicfestival.sg',
          facebookLink: 'https://facebook.com/musicfestivalsg',
          instagramLink: 'https://instagram.com/musicfestivalsg',
          websiteLink: 'https://musicfestival.sg',
          status: 1, // sent
          isDefault: false,
          recipientCount: 800,
          openRate: 0.92,
          clickRate: 0.67,
        },
        4: {
          event: {
            id: 1,
            name: 'CrowdServe Annual Conference 2024',
            organizer: {
              name: 'CrowdServe Events',
            },
            startTime: '2024-03-15T09:00:00.000Z',
            endTime: '2024-03-15T18:00:00.000Z',
            location: 'Singapore Convention Centre',
            address: '1 Raffles Place, Singapore 048616',
            timezone: 'Asia/Singapore',
          },
          subject: 'Important Updates for CrowdServe Conference',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
              <div style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%); padding: 40px 20px; text-align: center;">
                <h1 style="color: #333333; margin: 0; font-size: 28px; font-weight: bold;">Important Updates 📢</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <h2 style="color: #333333; font-size: 24px; margin-bottom: 20px;">Dear Attendee,</h2>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                  We have some important updates regarding the <strong>CrowdServe Annual Conference 2024</strong> that we'd like to share with you.
                </p>
                
                <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #856404; font-size: 18px; margin-bottom: 15px;">🔄 Schedule Changes:</h3>
                  <ul style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>New Keynote Speaker:</strong> Dr. Sarah Chen, AI Research Director at TechCorp</li>
                    <li><strong>Additional Workshop:</strong> "Blockchain in Healthcare" (2:00 PM - 3:30 PM)</li>
                    <li><strong>Extended Networking Session:</strong> Now runs until 7:00 PM</li>
                  </ul>
                </div>
                
                <div style="background-color: #d1ecf1; border-left: 4px solid #17a2b8; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #0c5460; font-size: 18px; margin-bottom: 15px;">🍽️ Catering Updates:</h3>
                  <ul style="color: #0c5460; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Lunch:</strong> Now served from 12:00 PM - 1:30 PM (extended by 30 minutes)</li>
                    <li><strong>Afternoon Break:</strong> Premium coffee and pastries at 3:30 PM</li>
                    <li><strong>Networking Dinner:</strong> Complimentary for all VIP ticket holders</li>
                  </ul>
                </div>
                
                <div style="background-color: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 20px 0;">
                  <h3 style="color: #155724; font-size: 18px; margin-bottom: 15px;">✨ New Features:</h3>
                  <ul style="color: #155724; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px;">
                    <li><strong>Mobile App:</strong> Download the event app for real-time updates</li>
                    <li><strong>Live Streaming:</strong> Selected sessions will be streamed online</li>
                    <li><strong>Digital Certificates:</strong> Attendance certificates available post-event</li>
                  </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                  <a href="https://crowdserve.xyz/event/1/updates" style="background-color: #667eea; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">View Full Schedule</a>
                  <a href="https://crowdserve.xyz/app" style="background-color: #28a745; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Download App</a>
                </div>
                
                <p style="color: #666666; font-size: 16px; line-height: 1.6;">
                  Thank you for your attention to these updates. We're excited to deliver an even better experience for all attendees!
                </p>
                
                <p style="color: #666666; font-size: 14px; margin-top: 30px;">
                  Best regards,<br>
                  <strong>CrowdServe Events Team</strong>
                </p>
              </div>
            </div>
          `,
          sendTime: '2024-03-10T14:00:00.000Z',
          organiserEmail: 'organizer@crowdserve.xyz',
          facebookLink: 'https://facebook.com/crowdserve',
          instagramLink: 'https://instagram.com/crowdserve',
          websiteLink: 'https://crowdserve.xyz',
          status: 2, // draft
          isDefault: false,
          recipientCount: 0,
          openRate: 0.0,
          clickRate: 0.0,
        },
      };

      const emailDetail =
        emailDetailData[emailId as keyof typeof emailDetailData] ||
        emailDetailData[1];

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: emailDetail,
              },
            ]);
          }, 1000);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Update Email Detail API
  mock
    .onPut(new RegExp(`${API.updateEmailDetail.put}`.replace('{id}', '(.*)')))
    .reply((config: any) => {
      const emailData = JSON.parse(config.data);

      return new Promise((resolve, reject) => {
        if (resolve) {
          setTimeout(() => {
            resolve([
              200,
              {
                code: 200,
                message: 'OK',
                data: {
                  ...emailData,
                  updatedAt: new Date().toISOString(),
                },
              },
            ]);
          }, 1500);
        } else {
          reject(new Error('Something is wrong'));
        }
      });
    });

  // Delete Email API
  mock
    .onDelete(new RegExp(`${API.deleteEmail.delete}`.replace('{id}', '(.*)')))
    .reply(
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
            }, 1000);
          } else {
            reject(new Error('Something is wrong'));
          }
        }),
    );
};

export default MockAPI;
