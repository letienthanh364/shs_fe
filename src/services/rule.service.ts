import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import ruleApi from "src/apis/rule.api";
import { SuccessReponse } from "src/types/_commons/common.type";
import { DeviceAttribute } from "src/types/device/device.attribute.type";
import { RuleModel } from "src/types/rule/rule.type";

export const RULE_KEY = "rules";
export const PUBLISHERS_KEY = "publishers";
export const SUBSCRIBERS_KEY = "subscribers";

// ! create
const useCreateRule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ruleApi.createRule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [RULE_KEY],
      });
    },
  });
};

// ! get
const useListRules = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<RuleModel[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<RuleModel[]>, Error>({
    queryKey: [RULE_KEY],
    queryFn: () => ruleApi.listAllRules().then((res) => res.data),
    ...options,
  });
};

const useGetPublishers = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<DeviceAttribute[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<DeviceAttribute[]>, Error>({
    queryKey: [RULE_KEY],
    queryFn: () => ruleApi.getPublishers().then((res) => res.data),
    ...options,
  });
};

const useGetSubscribers = (
  options?: Omit<
    UseQueryOptions<SuccessReponse<DeviceAttribute[]>, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<SuccessReponse<DeviceAttribute[]>, Error>({
    queryKey: [RULE_KEY],
    queryFn: () => ruleApi.getSubscribers().then((res) => res.data),
    ...options,
  });
};

// ! update
const useUpdateRule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ruleApi.updateRule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [PUBLISHERS_KEY],
      });
    },
  });
};

// ! delete
const useDeleteRule = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ruleApi.deleteRule,
    onSuccess() {
      qc.invalidateQueries({
        queryKey: [SUBSCRIBERS_KEY],
      });
    },
  });
};

const RuleServices = {
  queries: { useListRules, useGetPublishers, useGetSubscribers },
  create: { useCreateRule },
  update: { useUpdateRule },
  delete: { useDeleteRule },
};
export default RuleServices;
