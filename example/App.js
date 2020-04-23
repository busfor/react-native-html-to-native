import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Button,
} from 'react-native';
import {HTMLView} from '@busfor/react-native-html-to-native';

export default () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {visible && loading && (
        <ActivityIndicator
          size="large"
          color="red"
          style={styles.loaderStyle}
        />
      )}
      <ScrollView style={styles.container}>
        <Button
          title="Toggle HTML"
          onPress={() => {
            setVisible(!visible);
            setLoading(!visible);
          }}
        />
        {visible && (
          <HTMLView
            style={styles.container}
            onLinkPress={(url) => console.log(url)}
            onError={(err) => console.log(err)}
            styles={styles}
            renderers={{
              'a.link': (renderedChildren, style, props) => {
                return (
                  <TouchableOpacity
                    key={props.key}
                    onPress={() =>
                      console.log('Clicked', props.attributes.href)
                    }
                    style={style}>
                    {renderedChildren}
                  </TouchableOpacity>
                );
              },
            }}
            html={html}
            onLoading={setLoading}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const html = `
<div class="template container"><nav class="breadcrumbs"><div class="breadcrumbs__item"><a href="/">Билеты на автобус</a></div><div class="breadcrumbs__item">Договор оферты</div></nav><h2 class="agreement-title">Соглашение между пользователем сайта BUSFOR.RU и компанией ООО «БАСФОР»</h2><ol><li class="point">Общие положения<ol><li>ООО «БАСФОР» (далее по тексту – «БАСФОР») предлагает Пользователям использовать сервис для поиска и покупки билетов на автобусы, размещенный на интернет-портале <a href="/">www.busfor.ru</a>(далее - busfor.ru) на условиях, изложенных в настоящем Пользовательском соглашении (далее – Соглашение). Соглашение может быть изменено БАСФОР без какого-либо специального уведомления, новая редакция Соглашения вступает в силу с момента ее размещения на www.busfor.ru, если иное не предусмотрено новой редакцией Соглашения.</li><li>Воспользовавшись любой функциональной возможностью busfor.ru, Пользователь выражает свое безоговорочное согласие со всеми условиями настоящего Соглашения и обязуется их соблюдать или прекратить использование busfor.ru</li><li>Для того, чтобы воспользоваться сервисом для поиска и бронирования билетов на автобусы, размещенном на busfor.ru, Пользователю необходимо иметь компьютер и доступ в Интернет. Все вопросы приобретения прав доступа в Интернет, покупки и наладки соответствующего оборудования и программных продуктов решаются Пользователем самостоятельно и не подпадают под действие настоящего Соглашения.</li><li>Пользователями сервиса для поиска и покупки билетов на автобусы busfor.ru являются все лица, использующую любую функциональную возможность busfor.ru.</li><li>Обслуживание клиентов производится ООО «БАСФОР», зарегистрированным и действующим в соответствии с законодательством Российской Федерации.</li><li>Вся инфраструктура busfor.ru, а также его программное обеспечение и информация, размещенная на нем, является собственностью БАСФОР, за исключением информации, предоставленной поставщиками услуг (компаниямиперевозчиками).</li><li>Покупка Пользователем билета на busfor.ru (заканчивается нажатием кнопки "Купить", следующей за формой предоставления личных данных) равносильна акцепту им оферты, то есть окончательному согласию Пользователя со всеми условиями настоящего Соглашения и его подписанию обеими сторонами</li></ol></li><li class="point">Правила пользования интернет-порталом <a href="/">www.busfor.ru</a><ol><li>Принимая условия настоящего Соглашения, Пользователь подтверждает:<ol><li>свою правоспособность и дееспособность – Пользователь имеет право заключать настоящее Соглашение от своего имени и прочих лиц, которыми Пользователь юридически уполномочен, а также вступать в любые договорные отношения, вытекающие из пользования возможностями busfor.ru (заключать договоры на приобретение услуг с компаниями-перевозчиками, оплачивать услуги компаний-перевозчиков);</li><li>в случае действия в интересах третьих лиц, Пользователь обязуется проинформировать таких лиц об условиях бронирования/покупки, которые он производит в их интересах, включая все правила и ограничения, применимые к этому бронированию/покупке;</li><li>согласие о личной ответственности за обстоятельства, возложенные на него в результате заключения настоящего Соглашения и использование сервиса для поиска и покупки билетов на автобусы, размещенного на busfor.ru.</li><li>достоверность вводимых им при работе с busfor.ru личных и персональных данных пассажиров, вносимых на busfor.ru, принимая на себя всю ответственность за их точность и полноту;</li><li>согласие с тем, что все договоры о предоставлении услуг перевозки, доступных на busfor.ru, Пользователь заключает напрямую с поставщиками данных услуг (компаниями-перевозчиками);</li><li>понимание того, что любое нарушение законных требований компании-перевозчика, а также самостоятельный отказ от уже забронированных и оплаченных услуг, может привести к аннуляции бронирования и/или билетов, возможным финансовым потерям со стороны Пользователя и отказу в доступе к <a href="/">www.busfor.ru</a>;</li><li>согласие о личной ответственности за подготовку всех документов, необходимых для совершения поездки: Пользователю/Пассажиру следует самостоятельно ознакомиться с требованиями таможенного, паспортного, визового и иного контроля стран на выбранном маршруте, в т.ч. касающихся сроков действия документов, удостоверяющих личность и правилами провоза багажа, груза и ценностей. Пользователь/Пассажир принимает на себя всю ответственность за подготовку всех необходимых для поездки документов, таких как виза, действительный паспорт, документы необходимые для выезда несовершеннолетних детей;</li><li>понимание того, что билет (Электронный билет/Маршрутная квитанция) формируется в соответствии с актуальной информацией об услугах компаний-перевозчиков, которая предоставлена компаниями-перевозчиками БАСФОР и расположена на busfor.ru в том виде, в котором она получена;</li><li>понимание того, что:<ol><li>компания-перевозчик несет ответственность за предоставление услуги по перевозке Пользователя/пассажира или третьих лиц, указанных в билете;</li><li>компания-перевозчик несет ответственность за задержку, отмену и/или перенос своих рейсов на условиях, указанных в Уставе автомобильного транспорта и городского наземного электрического транспорта (ФЗ №259-ФЗ от 08.11.2007) и «Правилах перевозок пассажиров и багажа автомобильным транспортом и городским наземным электрическим транспортом», утвержденных Постановлением Правительства РФ от 14.02.2009г. №112, с последующими изменениями и дополнениями и Правилах перевозчика.</li><li>компания-перевозчик несет ответственность за уровень обслуживания на своих рейсах.</li></ol></li></ol></li><li>Пользователь может сохранять на цифровое устройство, выводить на печать и использовать информацию, размещенную на busfor.ru, исключительно в целях личного, некоммерческого использования. Любое использование (в т. ч. цитирование) информации, размещенной на busfor.ru, в коммерческих целях возможно только при наличии письменного разрешения БАСФОР.</li></ol></li><li class="point">Описание услуг, предоставляемых сервисом для поиска и покупки билетов на автобусы <a href="/">www.busfor.ru</a><ol><li>Сервис для поиска и покупки билетов на автобусы, принадлежащий ООО «БАСФОР», предназначен исключительно для того, чтобы помогать Пользователям организовывать свои поездки, предоставлять Пользователям информацию о расписании автобусов и предложениях компаний-перевозчиков, обеспечивать Пользователям доступ к самостоятельному бронированию, оплате и оформлению электронных билетов.</li><li>Busfor.ru содержит информацию о расписании автобусов, наличии мест, размерах тарифов (включая все налоги и сборы) на перевозки и правилах их применения, в том виде, в котором ее передают busfor.ru поставщики услуг (компании-перевозчики) или их полномочные представители, как самостоятельно, так и через глобальные или локальные дистрибутивные системы.</li><li>Все договоры о предоставлении услуг пассажирской перевозки, информация о которых размещена на busfor.ru, заключаются Пользователем напрямую с поставщиками данных услуг (компаниями-перевозчиками) в процессе оформления и покупки билетов.</li></ol></li><li class="point">Правила бронирования<ol><li>Все предложения, цены, а также условия продажи билетов могут быть изменены поставщиками услуг (компаниями-перевозчиками) и/или БАСФОР (по поручению компании-перевозчика) без предварительного уведомления Пользователя, ограничены по времени, наличию мест и срокам предварительного заказа, датам проезда, факторами выходных дней и праздников, сезонными колебаниями цен, а также временной неработоспособностью глобальных и локальных дистрибутивных систем, инвенторных систем бронирования компаний-перевозчиков и/или подвержены другим изменениям, условиям и ограничениям.</li><li>Условия любых изменений в оформленных билетах, отказа от услуг, частичного и полного возврата, равно как и другие условия оказания услуг компаниями-перевозчиками, регламентируются Уставом автомобильного транспорта и городского наземного электрического транспорта (ФЗ №259-ФЗ от 08.11.2007), «Правилами перевозок пассажиров и багажа автомобильным транспортом и городским наземным электрическим транспортом», утвержденных Постановлением Правительства РФ от 14.02.2009г. №112 с последующими изменениями и дополнениями, Условиями компании-перевозчика, настоящим Соглашением, а также законодательством РФ.</li><li>Условия компании-перевозчика отображаются в системе бронирования в том виде, в котором они передаются поставщиками услуг (компаниями-перевозчиками). В случае, если Пользователь не может воспринять/оценить полноту и смысл информации из информации, размещенной на busfor.ru, он может перед совершением оплаты и/или бронирования услуг связаться с оператором по телефонам <a href="tel:84953747677">8 (495) 374-76-77</a> для уточнения и разъяснения информации. В случае необходимости получить/уточнить информацию о предстоящей поездке по уже купленному билету, Пользователь вправе связаться с оператором по телефонам <a href="tel:84953747677">8 (495) 374-76-77</a>.</li><li>При бронировании билетов на рейсы в пределах РФ Фамилия Имя и Отчество (ФИО) пассажиров с&nbsp;российским гражданством&nbsp;вводятся на русском языке. При бронировании билетов на международные рейсы и на рейсы в пределах РФ (если Вы едете по национальному или заграничному паспорту) ФИО пассажиров вводятся в латинском регистре.</li><li>При оформлении Электронного билета Пользователь указывает персональные данные Пассажира как в документе и на языке, который указан в документе, используемом в поездке. Если документ оформлен на нескольких языках, Пользователь обязуется самостоятельно ознакомиться с правилами паспортного контроля на выбранном маршруте. Пользователь вправе, перед совершением оплаты и/или бронирования Электронного билета, связаться с оператором колл-центра по телефону <a href="tel:84953747677">8 (495) 374-76-77</a> или по электронной почте <a class="mail" href="mailto:help@busfor.ru">help@busfor.ru</a> для уточнения и разъяснения информации, получения рекомендаций по оформлению Электронного билета.</li><li>Пользователь обязан указывать только достоверные и точные личные данные при оформлении Электронного билета, как собственные, так и третьих лиц, в пользу которых оформляется Электронный билет. Пользователь/Пассажир самостоятельно несет все риски, связанные с не указанием/ненадлежащим указанием персональных данных лиц (в т.ч. в части языка ввода персональных данных), в пользу которых оформлен Электронный билет, а также с ненадлежащим уведомлением Пассажира о заключении и/или изменении условий договора перевозки. В случае предоставления Пользователем недостоверной/некорректной информации при оформлении Электронного билета, риск отказа в предоставлении услуги по перевозке/сложностей при прохождении таможенного контроля лежит на Пользователе.</li><li>Заказы, оформленные Пользователем, носят окончательный характер. Сразу же после поступления от Пользователя сформированного заказа и его полной оплаты, БАСФОР приступает к оформлению билетов.</li><li>Все билеты оформляются только после совершения Пользователем оплаты (при оплате платежной картой - после соответствующей проверки прохождения транзакции оплаты по платежной карте).</li><li>После совершения оплаты, в соответствии с положениями Федерального закона "О применении контрольно-кассовой техники при осуществлении наличных денежных расчетов и (или) расчетов с использованием электронных средств платежа" от 22.05.2003 N54-ФЗ, на электронный адрес, указанный Пользователем при оформлении билетов, будет направлен электронный чек. Действительность электронного чека Пользователь может проверить по указанному на нем QR-коду на сайте налоговой инспекции <a target="_blank" href="https://www.nalog.ru/">www.nalog.ru</a>.</li><li>В случае, если транзакция по платежной карте будет оценена БАСФОР/банком-партнером как подозрительная, БАСФОР может запросить у Пользователя ряд документов, подтверждающих принадлежность платежной карты Пользователю.</li><li>Возврат денег в размере, предусмотренном законодательством и условиями компании-перевозчика, производится на платежную карту, которой был оплачен заказ, если оплата была произведена платежной картой или наличными средствами, если оплата была произведена наличными.</li><li>Изменение личных данных любого из пассажиров в оформленном билете может привести к изменению условий перевозки, так как для изменения этих данных необходимо произвести аннуляцию оформленного бронирования/покупки билета и оформление нового, в соответствии с условиями компаний-перевозчиков. Таким образом, Пользователь принимает на себя все возможные риски (оформление нового заказа, изменение тарифа, возврат денежных средств, штрафы), связанные с его действиями по допущению ошибок и неточностей в предоставлении личных данных.</li><li>Компания-перевозчик в одностороннем порядке либо БАСФОР (по поручению компании-перевозчика) может аннулировать бронь или уже оформленный билет в случае «двойных» бронирований (т.н. double booking – повторное бронирование одного и того же пассажира на один и тот же рейс). Для избежания «двойных бронирований» Пользователю необходимо отменить все ранее сделанные в других системах бронирования дублирующиеся заказы. В противном случае, БАСФОР не несет ответственности за аннуляцию компаниями-перевозчиками забронированых мест или уже выписанных билетов.</li><li>Билеты для нижеперечисленных категорий граждан (в связи с особенностями обслуживания) могут быть забронированы и оформлены только в офисах компаний-перевозчиков (либо на автовокзале/автостанции) во избежание риска отказа в приеме к перевозке со стороны перевозчика:<ol><li>Несопровождаемый несовершеннолетний ребенок;</li><li>Инвалид в кресле-каталке;</li><li>Больной на носилках;</li><li>Пассажир, лишенный зрения или лишенный слуха.</li></ol></li><li>В случае, когда Пользователь по каким-либо причинам хочет отменить поездку, ему необходимо подать заявление о возврате билета в личном кабинете на сайте <a href="/">www.busfor.ru</a>.</li><li>В случае, если Пользователь хочет направить в адрес БАСФОР жалобу/претензию, ему необходимо:<ol><li>Через личный кабинет на сайте <a href="/">www.busfor.ru</a> оставить заявку на возврат, с обязательным указанием причины обращения и описанием жалобы/претензии по конкретному билету/заказу.</li><li>Составить официальную претензию в письменном виде (с указанием даты составления претензии, подписью заявителя и приложением документов, подтверждающих обстоятельства, указанные в жалобе/претензии) и отправить ее почтой России/курьером по адресу ООО «БАСФОР», указанному в разделе 9 настоящего Соглашения.</li><li>Составить официальную претензию в письменном виде (с указанием даты составления претензии, подписью заявителя и приложением документов, подтверждающих обстоятельства, указанные в жалобе/претензии) и отправить ее скан (четкое изображение и читаемый текст) на электронный адрес БАСФОР <a class="mail" href="mailto:help@busfor.ru">help@busfor.ru</a>.</li></ol></li></ol></li><li class="point">Оплата услуг<ol><li>БАСФОР имеет право взимать с Пользователя дополнительные сервисные (агентские) сборы за услуги по бронированию и оформлению/продаже билетов, а также за возврат и обмен ранее оформленного билета.</li><li>Сервисный сбор за оформление включается в общую стоимость билета (услуги), оформляемого Пользователем. Наличие и размер данных сборов зависит от условий, компании-перевозчика). Размер сервисного сбора устанавливается отдельно для каждого варианта перевозки и указывается на busfor.ru вместе с подробными деталями рейса, а также отображается в получаемом Пользователем билете (маршрутной квитанции/электронном билете).</li><li>В случае полного или частичного возврата билетов Пользователем, сервисный сбор БАСФОР возврату не подлежит вне зависимости от причин возврата (добровольный возврат или вынужденный возврат по вине перевозчика).</li><li>БАСФОР имеет право предоставлять пользователям скидки от тарифа, заявленного поставщиком услуг (компанией-перевозчиком). В случае полного или частичного возврата билетов, при оформлении которых БАСФОР была предоставлена скидка, размер такой скидки удерживается БАСФОР при расчете суммы к возврату, вне зависимости от причин возврата (добровольный возврат или вынужденный возврат по вине перевозчика).</li><li>Сервисный сбор, который БАСФОР имеет право взимать с Пользователя за услуги по обмену или внесению любых изменений в билеты, включается в общую стоимость обмена и внесения изменений наравне со сборами компании.</li><li>При оплате Пользователем билетов с помощью банковской карты посредством инструментов интернет-эквайринга, БАСФОР берёт на себя обязательство не хранить на своей стороне информацию о номере, сроке действия, или других параметрах банковской карты Пользователя. Весь процесс авторизации и перечисления средств со счета Пользователя производится им в режиме безопасного соединения.</li><li>БАСФОР имеет право запросить у Пользователя следующие документы: копию банковской карты с обеих сторон так, чтобы были отчетливо видны имя/фамилия и подпись держателя карты, первые шесть и последние четыре цифры номера карты, а также копию документа, удостоверяющего личность.</li><li>БАСФОР имеет право отказать Пользователю в предоставлении услуг по своему усмотрению, в том числе, в случае отказа от предоставления указанных в п.5.7. настоящего Соглашения документов. В этом случае средства, перечисленные Пользователем за заказанные услуги, подлежат возврату в соответствии с настоящим Соглашением.</li><li>Окончательная стоимость билетов в Сервисе для поиска и покупки билетов на автобусы, на busfor.ru отображается в российских рублях.</li><li>В случае, если валюта карты Пользователя отлична от российских рублей, банк-эмитент карты Пользователя конвертирует указанную сумму в валюту РФ по своему внутреннему курсу, таким образом, сумма в валюте карты может отличаться от суммы, указанной на <a href="/">www.busfor.ru</a> (в том числе в большую сторону), поскольку внутренний курс банка всегда отличается от опубликованных курсов ЦБ РФ или FOREX. В этом случае, до оплаты с использованием платежной карты, Пользователь обязан уточнить внутренний курс банка-эмитента карты и размер комиссии банка за конвертацию. Своей оплатой Пользователь подтверждает, что до момента оплаты получил соответствующую информацию и ознакомлен с итоговой ценой в валюте карты.</li><li>Датой исполнения обязательств Пользователя по оплате услуг сервиса для поиска и покупки билетов на автобусы с помощью платежной карты является дата зачисления денежных средств на расчетный счет БАСФОР.</li><li>При способах оплаты билетов, отличных от оплаты банковской картой, используются Российские рубли. Указанная на <a href="/">www.busfor.ru</a> цена в Российских рублях действительна при условии полной оплаты заказа в день бронирования на территории Российской Федерации.</li><li>На busfor.ru используются самые современные технологии с целью обеспечения оптимального уровня безопасности торговых сделок с использованием кредитных карт. Персональные данные каждого клиента, а также данные его кредитной карты при работе с <a href="/">www.busfor.ru</a> обеспечены надежной защитой. БАСФОР гарантирует, что информация о Пользователях услуг сервиса для поиска и покупки билетов на автобусы не может быть перехвачена или дешифрована посторонними лицами.</li></ol></li><li class="point">Конфиденциальность и персональные данные<ol><li>БАСФОР обязуется использовать все личные и персональные данные Пользователя, указываемые им в процессе оформления билетов на автобусы, исключительно для оформления продажи соответствующих услуг, идентификации и поддержки клиентов. БАСФОР обязуется ни при каких условиях не распространять и не передавать личные данные Пользователя третьим лицам, иначе как в целях оформления билетов на автобус и за исключением случаев, предусмотренных действующим Законодательством Российской Федерации.</li><li>Оплата Пользователем билета на автобус является безусловным и безотзывным согласием на сбор и обработку - систематизацию, накоплениe, хранениe, уточнениe, использованиe, распространениe, уничтожениe и любым другим образом - на неограниченный срок, за исключением случаев, установленных действующим законодательством РФ, - своих персональных данных БАСФОР, а также третьим лицам без дальнейшего уведомления Пользователя об обработке его персональных данных (в том числе их передачу и распространение), с целью осуществления деятельности по предоставлению услуг по перевозке (в том числе заключения и выполнения условий договоров), связанной с ней финансово-хозяйственной деятельности, осуществление посреднической (агентской) деятельности и/или реализации и регулирования других отношений, требующих обработки персональных данных, в соответствии с требованиями Федерального закона от 09.02.2007 N16-ФЗ "О транспортной безопасности" (с изменениями и дополнениями), Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и действующего законодательства РФ.</li><li>Предоставляя свои персональные данные БАСФОР, Пользователь дает согласие на их обработку БАСФОР, в том числе в целях продвижения товаров и услуг, а также передачу персональных данных третьим лицам, привлеченным БАСФОР с целью выполнения обязательств перед Пользователем. В случаях, когда Пользователь (родитель, опекун) осуществляет оформление билета для ребенка (до 14 лет), согласие на обработку персональных данных ребенка БАСФОР получает от родителя/опекуна.</li><li>Пользователь дает согласие на получение от БАСФОР транзакционно-триггерных сообщений, информационных сообщений, а также новостных и маркетинговых сообщений. Частота сообщений зависит от факторов и действий Пользователя, в то же время БАСФОР берет на себя обязанность предпринять разумные усилия, чтобы Пользователь не получал чрезмерные объёмы рассылок.</li><li>Пользователь несет ответственность за достоверность информации/сведений, размещаемых им на busfor.ru в общедоступной форме (комментарии, отзывы).</li><li>БАСФОР вправе осуществлять записи телефонных разговоров с Пользователем. При этом БАСФОР обязуется: предотвращать попытки несанкционированного доступа к информации, полученной в ходе телефонных переговоров и/или передачу ее третьим лицам, не имеющим непосредственного отношения к исполнению Заказов.</li><li>Каждому Пользователю при бронировании/покупке билета присваивается персональный ID-номер, который Пользователь может узнать в своем личном кабинете на сайте busfor.ru. ID-номер присваивается с целью идентификации Пользователя при последующих посещениях сайта busfor.ru, а также для эффективной обработки заказов (формирование истории заказов), предложения Пользователю интересующей его рекламной информации БАСФОР.<br>ID-номер Пользователя может передаваться третьей стороне, без согласования с Пользователем.<br>Пользователь вправе отказаться от присвоения ему ID-номера, обратившись по адресу электронной почты: <a class="mail" href="mailto:help@busfor.ru">help@busfor.ru</a>.</li><li>В случае, если Пользователь хочет отказаться от получения рассылки, то для этого достаточно кликнуть по ссылке «Отписаться от рассылки» внизу письма. Отписка от получения сообщений всегда доступна внизу каждого email-сообщения, а также БАСФОР всегда реагирует на просьбу Пользователя об отписке от получения сообщений при обращении в службу технической поддержки (<a class="mail" href="mailto:help@busfor.ru">help@busfor.ru</a>).</li><li>Пользователь предоставляет БАСФОР свое согласие на смену цели обработки персональных данных. Оплата Пользователем билета является подтверждением, что его известили о включении в базу(ы) персональных данных БАСФОР, известили о его праваx, сообщили о цели сбора данных и лицах, которым передаются персональные данные Пользователя в соответствии с требованиями Федерального закона от 09.02.2007 N16-ФЗ "О транспортной безопасности" (с изменениями и дополнениями), Федерального закона от 27.07.2006 №152-ФЗ «О персональных данных» и действующего законодательства РФ.</li><li>Пользователь соглашается с тем, что не может изменять, воспроизводить, публиковать, создавать производные формы или распространять любую информацию, размещенную на <a href="/">www.busfor.ru</a>. Пользователь также дает согласие не использовать никакого автоматизированного программного обеспечения для сбора или копирования информации с целью доступа к материалам и данным <a href="/">www.busfor.ru</a>, а также не использовать никакого программного обеспечения, способного нанести вред busfor.ru и нарушить его нормальное функционирование.</li></ol></li><li class="point">Ответственность сторон<ol><li>Ответственность БАСФОР:<ol><li>Сервис для поиска и покупки билетов на автобусы busfor.ru является динамической системой, компоненты которой могут в любой момент быть изменены или дополнены, в связи с этим Пользователю предлагается использовать систему бронирования в режиме «как есть». В случае полной или частичной неработоспособности системы и ее компонентов в течение какого-либо времени, а также при отсутствии возможности доступа Пользователя к системе или несения им любых косвенных или прямых затрат в связи с данными обстоятельствами, БАСФОР не несет перед Пользователем никакой ответственности.</li><li>Вся информация, касающаяся автобусных рейсов, размещается на busfor.ru в полном соответствии с тем, как она предоставлена БАСФОР непосредственно компаниями-перевозчиками или их полномочными представителями по поручению и на основании предоставленных компаниями-перевозчиками данных. БАСФОР, несмотря на компетентность и тщательный отбор поставщиков услуг, не имеет возможности производить тотальную независимую проверку предоставляемой компаниями-перевозчиками информации, и не может гарантировать полное отсутствие неточностей в ней, в связи с чем не несет перед Пользователем ответственности за любые ошибочные данные об услугах, равно как и за причиненный Пользователю вред или убытки из-за наличия ошибок в размещаемой на busfor.ru информации.</li><li>БАСФОР не несет ответственности за несоблюдение компаниями-перевозчиками или их представителями условий предоставления услуг по перевозке, правил обслуживания и пунктуальности, так как это находится в исключительном ведении компаний-перевозчиков. Компании-перевозчики и другие поставщики услуг, представленные на busfor.ru, являются независимыми контрагентами и не являются агентами или сотрудниками БАСФОР. БАСФОР не отвечает за действия, ошибки, нарушения правил, гарантий или халатность любой из таких компаний-перевозчиков, а также за проистекающий из этих факторов личный урон, ущерб здоровью, смерти, ущерб имуществу или другого рода моральный и материальный ущерб или затраты. БАСФОР не несет ответственность и не будет возмещать расходы в случае задержек или отмен рейсов, забастовок, форс-мажорных обстоятельств и по любым другим поводам, не находящимся под непосредственным контролем БАСФОР. Также БАСФОР не несет ответственности за любые дополнительные расходы, недомолвки, задержки, изменения маршрутов или действия правительств и властей.</li><li>БАСФОР не несет ответственности за качество и защищенность используемых Пользователем каналов связи при использовании busfor.ru, равно как и за любой ущерб, причиненный Пользователю в результате использования им некачественных или незащищенных каналов связи.</li><li>Если, несмотря на перечисленные выше ограничения, БАСФОР будет признан соответствующими уполномоченными органами несущим ответственность за какие-либо потери или ущерб, то совокупный размер ответственности БАСФОР ни в коем случае не может превышать стоимости услуги, оплаченной Пользователем в связи с операцией на busfor.ru. В таких случаях с БАСФОР не могут быть удержаны штрафные санкции в любых видах, неустойки, плата за пользование чужими денежными средствами, упущенная выгода, моральный ущерб.</li><li>БАСФОР не несет ответственности за сбор и подготовку Пользователем всех документов, необходимых для пользования услугами компании-перевозчика. Пользователь/Пассажир принимает на себя обязательства по самостоятельному сбору и подготовке всех необходимых для поездки документов. БАСФОР не несет ответственности за незнание или несоблюдение пассажиром данных требований.</li></ol></li></ol></li><li class="point">Заключительные положения<ol><li>БАСФОР оставляет за собой право в любое время вносить изменения в условия использования busfor.ru, а также изменять условия настоящего Соглашения до получения от пользователя согласия с его условиями. Если время вступления изменений в силу специально не оговорено, они начинают свое действие с момента публикации на busfor.ru.</li><li>К настоящему Соглашению и отношениям, возникающими в связи с использованием Сервиса для поиска и покупки билетов на автобусы <a href="/">www.busfor.ru</a>, подлежит применению действующее Законодательство Российской Федерации.</li></ol></li><li class="point">Контактные данные<ol><li>Физический адрес ООО «БАСФОР»: 117638, г.Москва, ул.Одесская, д.2, корп.А, этаж 9. ИНН 7705952996, ОГРН 111746469433<br><br>Контактные номера телефонов <a href="tel:84953747677">8 (495) 374-76-77</a>.<br><br>Адрес электронной почты Администрации сайта для рассмотрения обращений Пользователей и иных лиц, включая оказание технической поддержки пользователей: <a class="mail" href="mailto:help@busfor.ru">help@busfor.ru</a>.</li></ol></li></ol></div>
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  'a.link': {
    padding: 8,
  },
  'a>TextNode': {
    color: 'green',
    fontSize: 16,
  },
  img: {
    width: 300,
    height: 200,
  },
  'p>TextNode': {
    fontSize: 16,
  },
  'ol>li>IndicatorNode': {
    color: 'green',
  },
  'ul>li>IndicatorNode': {
    color: 'blue',
  },
  'li>TextNode': {
    color: 'red',
  },
  li: {
    marginVertical: 4,
    marginLeft: 4,
  },
  loaderStyle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
