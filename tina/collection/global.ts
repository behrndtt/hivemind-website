import type { Collection, Template } from "tinacms";
import { ColorPickerInput } from "../fields/color";
import { iconSchema } from "../fields/icon";

// Icon options for dropdown menu items
const dropdownIconOptions = [
  { label: "Cloud", value: "Cloud" },
  { label: "Building", value: "Building2" },
  { label: "Monitor", value: "MonitorCog" },
  { label: "Shield", value: "Shield" },
  { label: "Headphones", value: "Headphones" },
  { label: "Award", value: "Award" },
  { label: "Lightbulb", value: "Lightbulb" },
  { label: "Trending Up", value: "TrendingUp" },
  { label: "Users", value: "Users" },
  { label: "Zap", value: "Zap" },
  { label: "Code", value: "Code" },
  { label: "Database", value: "Database" },
  { label: "Lock", value: "Lock" },
  { label: "Settings", value: "Settings" },
];

// Template for simple nav links
const navLinkTemplate: Template = {
  name: "link",
  label: "Simple Link",
  ui: {
    itemProps: (item) => ({ label: item?.label || "New Link" }),
    defaultItem: {
      label: "Link",
      href: "/",
    },
  },
  fields: [
    {
      type: "string",
      label: "Label",
      name: "label",
      required: true,
    },
    {
      type: "string",
      label: "Link",
      name: "href",
      required: true,
    },
  ],
};

// Template for dropdown menus with columns
const navDropdownTemplate: Template = {
  name: "dropdown",
  label: "Dropdown Menu",
  ui: {
    itemProps: (item) => ({ label: `▼ ${item?.label || "New Dropdown"}` }),
    defaultItem: {
      label: "Dropdown",
      columns: [
        {
          title: "Column 1",
          href: "/",
          items: [
            {
              title: "Item 1",
              description: "Description for item 1",
              href: "/",
              icon: "Cloud",
            },
          ],
        },
      ],
    },
  },
  fields: [
    {
      type: "string",
      label: "Label",
      name: "label",
      required: true,
    },
    {
      type: "object",
      label: "Columns",
      name: "columns",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "Column" }),
        max: 3,
      },
      fields: [
        {
          type: "string",
          label: "Column Title",
          name: "title",
          required: true,
        },
        {
          type: "string",
          label: "Column Link",
          name: "href",
        },
        {
          type: "object",
          label: "Items",
          name: "items",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title || "Item" }),
            max: 4,
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
              required: true,
            },
            {
              type: "string",
              label: "Description",
              name: "description",
            },
            {
              type: "string",
              label: "Link",
              name: "href",
            },
            {
              type: "string",
              label: "Icon",
              name: "icon",
              options: dropdownIconOptions,
            },
          ],
        },
      ],
    },
  ],
};

const Global: Collection = {
  label: "Global",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        iconSchema as any,
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
          options: [
            { label: "Default", value: "default" },
            { label: "Primary", value: "primary" },
          ],
        },
        {
          type: "object",
          label: "Navigation",
          name: "nav",
          list: true,
          templates: [navLinkTemplate, navDropdownTemplate],
        },
        {
          type: "object",
          label: "CTA Button",
          name: "cta",
          fields: [
            {
              type: "string",
              label: "Label",
              name: "label",
            },
            {
              type: "string",
              label: "Link",
              name: "href",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Footer",
      name: "footer",
      fields: [
        {
          type: "string",
          label: "Tagline",
          name: "tagline",
        },
        {
          type: "object",
          label: "Contact Info",
          name: "contact",
          fields: [
            {
              type: "string",
              label: "Email",
              name: "email",
            },
            {
              type: "string",
              label: "Phone",
              name: "phone",
            },
            {
              type: "string",
              label: "Address",
              name: "address",
            },
          ],
        },
        {
          type: "object",
          label: "Footer Columns",
          name: "columns",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.title }),
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "object",
              label: "Links",
              name: "links",
              list: true,
              ui: {
                itemProps: (item) => ({ label: item?.label }),
              },
              fields: [
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Social Links",
          name: "social",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.platform || 'undefined' };
            },
          },
          fields: [
            {
              type: "string",
              label: "Platform",
              name: "platform",
              options: [
                { label: "LinkedIn", value: "Linkedin" },
                { label: "Twitter/X", value: "Twitter" },
                { label: "GitHub", value: "Github" },
                { label: "Facebook", value: "Facebook" },
                { label: "Instagram", value: "Instagram" },
                { label: "YouTube", value: "Youtube" },
              ],
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
          ],
        },
        {
          type: "string",
          label: "Copyright",
          name: "copyright",
        },
      ],
    },
    {
      type: "object",
      label: "Theme",
      name: "theme",
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Primary Color",
          name: "color",
          ui: {
            component: ColorPickerInput,
          },
        },
        {
          type: "string",
          name: "font",
          label: "Font Family",
          options: [
            {
              label: "System Sans",
              value: "sans",
            },
            {
              label: "Nunito",
              value: "nunito",
            },
            {
              label: "Lato",
              value: "lato",
            },
          ],
        },
        {
          type: "string",
          name: "darkMode",
          label: "Dark Mode",
          options: [
            {
              label: "System",
              value: "system",
            },
            {
              label: "Light",
              value: "light",
            },
            {
              label: "Dark",
              value: "dark",
            },
          ],
        },
      ],
    },
  ],
};

export default Global;
