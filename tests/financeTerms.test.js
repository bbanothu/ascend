const request = require('supertest');
const app = require('../app');

describe('Finance Terms Test', () => {
  it('should create a new finance terms agreement', async () => {
    const response = await request(app).post('/finance-terms').send({
      dueDate: '2024-12-31',
      policies: [
        { premium: 200, taxFee: 50, insuredName: 'John Doe' },
        { premium: 300, taxFee: 50, insuredName: 'Jane Doe' },
      ],
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should mark a finance terms agreement as agreed', async () => {
    const financeTermsId = 1;
    const response = await request(app).patch(`/finance-terms/${financeTermsId}/agree`);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('agreed');
  });

  it('should retrieve finance terms with filters and sorting', async () => {
    const response = await request(app).get('/finance-terms').query({
      downpayment: 0,
      // status: 'agreed',
      status: 'non-agreed',
      sortBy: 'dueDate',
      order: 'desc',
    });
  
    expect(response.status).toBe(200);

    console.log(response.body)
  
    expect(Array.isArray(response.body)).toBe(true);
  
    response.body.forEach((term) => {
      expect(term.downpayment).toBe(0);
      // expect(term.status).toBe('agreed');
      expect(term.status).toBe('non-agreed');

    });
  
    const dates = response.body.map((term) => new Date(term.dueDate));
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1] >= dates[i]).toBe(true); 
    }
  
    response.body.forEach((term) => {
      expect(term).toHaveProperty('policies');
      expect(Array.isArray(term.policies)).toBe(true);
    });
  
  });
  
});
