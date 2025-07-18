import type { DeviceData } from '@/components/DeviceDataTypes';

export const createMockDevice = (overrides: Partial<DeviceData> = {}): DeviceData => {
  const defaultDevice: DeviceData = {
    guids: ['mock-guid'],
    icon: {
      id: 'mock-icon',
      resolutions: [
        [16, 16],
        [32, 32]
      ]
    },
    id: 'mock-device-1',
    images: {
      default: 'mock-default.png',
      nopadding: 'mock-nopadding.png',
      topology: 'mock-topology.png'
    },
    line: {
      id: 'unifi',
      name: 'UniFi'
    },
    product: {
      abbrev: 'MD',
      name: 'Mock Device'
    },
    shortnames: ['mock-device'],
    sku: 'MOCK-SKU',
    syid: 'mock-syid',
    syids: ['mock-syid'],
    videos: null,
    btle: undefined,
    uisp: undefined,
    compliance: undefined,
    tripplets: undefined,
    unifi: undefined
  };

  return {
    ...defaultDevice,
    ...overrides
  };
};

// 🚀 Riktiga UniFi-enheter från UI.com!
export const mockDevices = {
  // UniFi Dream Machine
  udm: createMockDevice({
    id: 'UDM',
    product: { name: 'UniFi Dream Machine', abbrev: 'UDM' },
    line: { id: 'unifi', name: 'UniFi' },
    sku: 'UDM-US',
    shortnames: ['udm'],
    guids: ['e7e4a0f5-96a4-4a7d-b1c2-7c5d8e9f0a1b'],
    images: {
      default: 'udm_default',
      nopadding: 'udm_nopadding',
      topology: 'udm_topology'
    },
    unifi: {
      adoptability: 'supported',
      network: {
        model: 'UDM',
        type: 'gateway',
        deviceCapabilities: ['gateway', 'switch', 'ap'],
        numberOfPorts: 8,
        ethernetMaxSpeedMegabitsPerSecond: 1000,
        linkNegotiation: {}
      }
    }
  }),

  // UniFi Access Point WiFi 6
  u6lite: createMockDevice({
    id: 'U6-Lite',
    product: { name: 'UniFi 6 Lite', abbrev: 'U6-Lite' },
    line: { id: 'unifi', name: 'UniFi' },
    sku: 'U6-LITE-US',
    shortnames: ['u6lite'],
    guids: ['a1b2c3d4-e5f6-7890-abcd-ef1234567890'],
    images: {
      default: 'u6lite_default',
      nopadding: 'u6lite_nopadding',
      topology: 'u6lite_topology'
    },
    unifi: {
      adoptability: 'supported',
      network: {
        model: 'U6-Lite',
        type: 'ap',
        deviceCapabilities: ['ap'],
        features: {
          ax: true,
          bandsteer: true,
          gen: 6
        },
        radios: {
          ng: {
            maxPower: 22,
            maxSpeedMegabitsPerSecond: 1201
          },
          na: {
            maxPower: 22,
            maxSpeedMegabitsPerSecond: 574
          }
        },
        linkNegotiation: {}
      }
    }
  }),

  // UniFi Switch 24 Port
  us24: createMockDevice({
    id: 'US-24',
    product: { name: 'UniFi Switch 24', abbrev: 'US-24' },
    line: { id: 'unifi', name: 'UniFi' },
    sku: 'US-24-US',
    shortnames: ['us24'],
    guids: ['f1e2d3c4-b5a6-9870-dcba-fe9876543210'],
    images: {
      default: 'us24_default',
      nopadding: 'us24_nopadding',
      topology: 'us24_topology'
    },
    unifi: {
      adoptability: 'supported',
      network: {
        model: 'US-24',
        type: 'switch',
        deviceCapabilities: ['switch'],
        numberOfPorts: 24,
        ethernetMaxSpeedMegabitsPerSecond: 1000,
        linkNegotiation: {}
      }
    }
  }),

  // UniFi Protect Camera
  g4bullet: createMockDevice({
    id: 'UVC-G4-BULLET',
    product: { name: 'UniFi Protect G4 Bullet', abbrev: 'G4-Bullet' },
    line: { id: 'unifi', name: 'UniFi' },
    sku: 'UVC-G4-BULLET-US',
    shortnames: ['g4bullet'],
    guids: ['9a8b7c6d-5e4f-3210-9876-543210fedcba'],
    images: {
      default: 'g4bullet_default',
      nopadding: 'g4bullet_nopadding',
      topology: 'g4bullet_topology'
    },
    unifi: {
      adoptability: 'supported'
    }
  }),

  // UISP Device (Network)
  edgeRouter: createMockDevice({
    id: 'ER-X',
    product: { name: 'EdgeRouter X', abbrev: 'ER-X' },
    line: { id: 'uisp', name: 'UISP' },
    sku: 'ER-X-US',
    shortnames: ['erx'],
    guids: ['1234abcd-5678-90ef-ghij-klmnop567890'],
    images: {
      default: 'erx_default',
      nopadding: 'erx_nopadding',
      topology: 'erx_topology'
    },
    uisp: {
      bleServices: {
        factoryDefault: {
          mode: 'factory' as const
        }
      }
    }
  })
};

// För olika test scenarios
export const mockDeviceArrays = {
  unifiOnly: [mockDevices.udm, mockDevices.u6lite, mockDevices.us24],
  mixed: [mockDevices.udm, mockDevices.u6lite, mockDevices.edgeRouter],
  singleDevice: [mockDevices.u6lite],
  empty: []
};
