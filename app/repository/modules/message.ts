import type { HttpClient } from '../http'
import { apiRoutes } from '../api-routes'
import type {
  VerifiedSenderRes,
  DraftMessagesRes,
  DraftMessageRes,
  MessageDeleteRes,
  SentMessageRes,
  SentMessagesRes,
  ScheduledMessageRes,
  ScheduledMessagesRes,
  ScheduledStatusRes,
  SMSStatusRes,
  MessageResendRes,
  QueuedSMSRes,
  SMSDetailRes,
  RecurrentType,
  MessageReq,
  MessageRes,
} from '@/types/message'

export const MessageApi = (http: HttpClient) => ({
  fetchSenderId: () => http.get<VerifiedSenderRes>(apiRoutes.message.senderId),
  fetchDrafts: (page: number) =>
    http.get<DraftMessagesRes>(apiRoutes.message.drafts(page)),
  fetchDraft: (draftId: number) =>
    http.get<DraftMessageRes>(apiRoutes.message.draft(draftId)),
  deleteDraft: (draftId: number) =>
    http.post<MessageDeleteRes>(apiRoutes.message.deleteDraft(draftId)),
  fetchSentMessages: (page: number) =>
    http.get<SentMessagesRes>(apiRoutes.message.sents(page)),
  fetchSentMessage: (sentId: number) =>
    http.get<SentMessageRes>(apiRoutes.message.sent(sentId)),
  deleteSentMessage: (sentId: number) =>
    http.post<MessageDeleteRes>(apiRoutes.message.deleteSent, {
      messageids: sentId,
    }),
  fetchScheduledMessages: (page: number) =>
    http.get<ScheduledMessagesRes>(apiRoutes.message.scheduleds(page)),
  fetchScheduledMessage: (scheduledId: number) =>
    http.get<ScheduledMessageRes>(apiRoutes.message.scheduled(scheduledId)),
  deleteScheduledMessage: (scheduledId: number) =>
    http.post<MessageDeleteRes>(apiRoutes.message.deleteScheduled, {
      messageids: scheduledId,
    }),
  resumeScheduledMessage: (scheduledId: number) =>
    http.post<ScheduledStatusRes>(
      apiRoutes.message.resumeScheduled(scheduledId),
    ),
  pauseScheduledMessage: (scheduledId: number) =>
    http.post<ScheduledStatusRes>(
      apiRoutes.message.pauseScheduled(scheduledId),
    ),
  fetchSMSStatus: (page: number) =>
    http.get<SMSStatusRes>(apiRoutes.message.smsStatus(page)),
  resendSMS: (remoteMsgId: string) =>
    http.get<MessageResendRes>(apiRoutes.message.resend(remoteMsgId)),
  fetchQueuedMessages: (page: number) =>
    http.get<QueuedSMSRes>(apiRoutes.message.queued(page)),
  fetchSMSDetail: (id: number) =>
    http.get<SMSDetailRes>(apiRoutes.message.smsDetail(id)),
  fetchRecurrentTypes: () =>
    http.get<RecurrentType[]>(apiRoutes.message.recurrentType),
  sendMessage: (body: MessageReq) =>
    http.post<MessageRes>(apiRoutes.message.sendMessage, {
      sender_name: body.senderName,
      message: body.message,
      recipients: body.recipients,
      forcednd: body.dnd,
      listids: body.listIds,
      country_code: body.countryCode,
      message_type: body.messageType,
      source: body.source,
      sendtime: body.sendTime,
      recurrent_type: body.recurrentType,
      recurrent_count: body.recurrentCount,
      sendlater: body.sendLater,
    }),
  saveAsDraft: (body: MessageReq) =>
    http.post<MessageRes>(apiRoutes.message.saveAsDraft, {
      displayname: body.senderName,
      message: body.message,
      recipients: body.recipients,
      forcednd: body.dnd,
      listids: body.listIds,
      source: body.source,
    }),
  editScheduledMessage: (body: MessageReq) =>
    http.post<MessageRes>(apiRoutes.message.editScheduledMessage(body.id!), {
      displayname: body.senderName,
      message: body.message,
      recipients: body.recipients,
      country_id: body.countryCode,
      listids: body.listIds,
      dispatchtime: body.sendTime,
      message_type_id: body.messageType,
      forcednd: body.dnd,
      recurrent_type: body.recurrentType,
      recurrent_count: body.recurrentCount,
      sendlater: body.sendLater,
      source: body.source,
    }),
})
