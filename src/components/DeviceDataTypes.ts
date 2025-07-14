import { z } from 'zod';

const BtleSchema = z.object({
  factoryDefault: z.string().optional(),
  userConfigured: z.string().optional()
});

// const BtleSchema = z.object({
//   factoryDefault: z
//     .object({
//       mode: z.enum(['factory', 'default'])
//     })
//     .optional(),
//   userConfigured: z
//     .object({
//       mode: z.enum(['factory', 'default'])
//     })
//     .optional()
// });

const ComplianceSchema = z.object({
  anatel: z.string(),
  fcc: z.string(),
  ic: z.string(),
  icEmi: z.string(),
  modelName: z.string(),
  rfCmFcc: z.string(),
  rfCmIc: z.string(),
  text: z.object({
    BR: z.array(z.string()),
    CA: z.array(z.string()),
    US: z.array(z.string())
  })
});

const FirmwareSchema = z.object({
  board: z.array(z.string()),
  platform: z.string()
});

const ImagesSchema = z.object({
  default: z.string(),
  nopadding: z.string(),
  topology: z.string()
});

const IconSchema = z.object({
  id: z.string(),
  resolutions: z.array(z.array(z.number()))
});

const LineSchema = z.object({
  id: z.string(),
  name: z.string()
});

const ProductSchema = z.object({
  abbrev: z.string(),
  name: z.string()
});

const TrippletSchema = z.object({
  id: z.string(),
  model: z.string(),
  name: z.string()
});

const TrippletsSchema = z.object({
  unifi: z.array(TrippletSchema).optional(),
  uisp: z.array(TrippletSchema).optional()
});

const FeaturesSchema = z.object({
  atfDisabled: z.boolean().optional(),
  ax: z.boolean().optional(),
  bandsteer: z.boolean().optional(),
  be: z.boolean().optional(),
  gen: z.number().optional(),
  outdoorModeSupport: z.boolean().optional()
});

const RadioSchema = z.object({
  gain: z.number().optional(),
  maxPower: z.number().optional(),
  maxSpeedMegabitsPerSecond: z.number()
});

const RadiosSchema = z.object({
  '6e': RadioSchema.optional(),
  na: RadioSchema.optional(),
  ng: RadioSchema.optional()
});

const NetworkSchema = z.object({
  chipset: z.string().optional(),
  deviceCapabilities: z.array(z.string()),
  ethernetMaxSpeedMegabitsPerSecond: z.number().optional(),
  diagram: z.array(z.string()).optional(),
  linkNegotiation: z.unknown(),
  features: FeaturesSchema.optional(),
  minimumFirmwareRequired: z.string().nullable().optional(),
  model: z.string(),
  networkGroups: z
    .preprocess(
      (data: never) => {
        if (typeof data === 'object' && data !== null) {
          const invalidKeys = Object.keys(data).filter((key) => !/^eth\d+$/.test(key));
          if (invalidKeys.length > 0) {
            throw new Error(`Invalid network group keys: ${invalidKeys.join(', ')}`);
          }
        }
        return data;
      },
      z.record(z.string(), z.string())
    )
    .optional(),
  numberOfPorts: z.number().optional(),
  radios: RadiosSchema.optional(),
  systemIdHexadecimal: z.string().optional(),
  type: z.string(),
  subtypes: z.array(z.string()).optional()
});

const UniFiSchema = z.object({
  adoptability: z.string().optional(),
  network: NetworkSchema.optional()
});

const UISPSchema = z.object({
  bleServices: z
    .object({
      factoryDefault: z
        .object({
          mode: z.enum(['factory', 'default'])
        })
        .optional(),
      userConfigured: z
        .object({
          mode: z.enum(['factory', 'default'])
        })
        .optional()
    })
    .optional()
});

const DeviceSchema = z.object({
  btle: BtleSchema.optional(),
  uisp: UISPSchema.optional(),
  compliance: z.object({}).optional(),
  guids: z.array(z.string()),
  icon: IconSchema,
  id: z.string(),
  images: ImagesSchema,
  line: LineSchema,
  product: ProductSchema,
  shortnames: z.array(z.string()),
  sku: z.string(),
  syid: z.string().optional(),
  syids: z.array(z.string()).optional(),
  tripplets: TrippletsSchema.optional(),
  unifi: UniFiSchema.optional(),
  videos: z.any()
});

export const DataSchema = z.object({
  devices: z.array(DeviceSchema),
  version: z.string()
});

export type DeviceData = z.infer<typeof DeviceSchema>;
export type Data = z.infer<typeof DataSchema>;
