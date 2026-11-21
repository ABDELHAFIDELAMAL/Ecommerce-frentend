import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 1000 },
    { duration: '30s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const url = 'http://localhost:8090/api/v1/products';

  const response = http.get(url);

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time below 1 second': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
