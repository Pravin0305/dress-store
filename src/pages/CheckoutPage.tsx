
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import SectionHeader from '../components/SectionHeader';
import Stepper from '../components/Stepper';
import Input from '../components/Input';
import Select from '../components/Select';
import RadioCard from '../components/RadioCard';
import Button from '../components/Button';
import CartSummary from '../components/CartSummary';
import { useCart } from '../context/CartContext';
import { getProductById } from '../data';
import { INDIAN_STATE_OPTIONS } from '../utils/indianStates';
import { formatPrice } from '../utils/formatters';
import styles from '../styles/checkoutPage.module.css';

type Step = 1 | 2 | 3;

type PaymentMethod = 'cod' | 'upi' | 'card';

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface PaymentForm {
  method: PaymentMethod;
  upiId: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

type Errors<T> = Partial<Record<keyof T, string>>;

const EMPTY_SHIPPING: ShippingForm = {
  fullName: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  pincode: '',
};

const EMPTY_PAYMENT: PaymentForm = {
  method: 'cod',
  upiId: '',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCvv: '',
};

const STEP_LABELS = ['Shipping', 'Payment', 'Review'];

function CheckoutPage() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>(1);
  const [shipping, setShipping] = useState<ShippingForm>(EMPTY_SHIPPING);
  const [payment, setPayment] = useState<PaymentForm>(EMPTY_PAYMENT);
  const [shippingErrors, setShippingErrors] = useState<Errors<ShippingForm>>({});
  const [paymentErrors, setPaymentErrors] = useState<Errors<PaymentForm>>({});

  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function next() {
    if (step === 1) {
      const errs = validateShipping(shipping);
      setShippingErrors(errs);
      if (Object.keys(errs).length === 0) {
        setStep(2);
        scrollToTop();
      }
    } else if (step === 2) {
      const errs = validatePayment(payment);
      setPaymentErrors(errs);
      if (Object.keys(errs).length === 0) {
        setStep(3);
        scrollToTop();
      }
    }
  }

  function back() {
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
    scrollToTop();
  }

  function placeOrder() {
    const orderId = generateOrderId();
    const snapshot = {
      id: orderId,
      placedAt: new Date().toISOString(),
      shipping,
      payment: { method: payment.method },
      items,
      total,
    };
    try {
      window.localStorage.setItem(
        'dressstore.lastOrder.v1',
        JSON.stringify(snapshot),
      );
    } catch {

    }
    clear();
    navigate(`/order/confirmed?id=${orderId}`);
  }

  return (
    <Container size="xxl">
      <div className={styles.page}>
        <SectionHeader
          eyebrow="Almost there"
          title="Checkout"
          subtitle="A few quick details and your order is on its way."
        />

        <Stepper steps={STEP_LABELS} current={step} />

        <div className={styles.layout}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              if (step === 3) placeOrder();
              else next();
            }}
            noValidate
          >
            {step === 1 && (
              <ShippingStep
                value={shipping}
                onChange={setShipping}
                errors={shippingErrors}
              />
            )}

            {step === 2 && (
              <PaymentStep
                value={payment}
                onChange={setPayment}
                errors={paymentErrors}
              />
            )}

            {step === 3 && (
              <ReviewStep
                shipping={shipping}
                payment={payment}
                onEditShipping={() => setStep(1)}
                onEditPayment={() => setStep(2)}
              />
            )}

            <div className={styles.actions}>
              {step > 1 ? (
                <Button type="button" variant="ghost" onClick={back}>
                  ← Back
                </Button>
              ) : (
                <Button variant="ghost" to="/cart">
                  ← Back to cart
                </Button>
              )}
              <div className={styles.actionsRight}>
                {step < 3 ? (
                  <Button type="submit">Continue</Button>
                ) : (
                  <Button type="submit" size="lg" variant="accent">
                    Place order · {formatPrice(total)}
                  </Button>
                )}
              </div>
            </div>
          </form>

          <CartSummary />
        </div>
      </div>
    </Container>
  );
}

interface ShippingStepProps {
  value: ShippingForm;
  onChange: (v: ShippingForm) => void;
  errors: Errors<ShippingForm>;
}

function ShippingStep({ value, onChange, errors }: ShippingStepProps) {
  const set = <K extends keyof ShippingForm>(key: K, v: ShippingForm[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <>
      <h2 className={styles.stepTitle}>Shipping address</h2>
      <p className={styles.stepIntro}>
        We deliver across India. Most orders arrive in 3–5 business days.
      </p>

      <div className={`${styles.row} ${styles.rowFull}`}>
        <Input
          label="Full name"
          required
          value={value.fullName}
          onChange={(e) => set('fullName', e.target.value)}
          autoComplete="name"
          placeholder="Riya Sharma"
          error={errors.fullName}
        />
      </div>

      <div className={styles.row}>
        <Input
          type="email"
          label="Email"
          required
          value={value.email}
          onChange={(e) => set('email', e.target.value)}
          autoComplete="email"
          placeholder="riya@example.com"
          error={errors.email}
        />
        <Input
          type="tel"
          label="Phone"
          required
          value={value.phone}
          onChange={(e) => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
          autoComplete="tel"
          placeholder="98765 43210"
          hint="10-digit Indian mobile number"
          leftIcon={<span>+91</span>}
          error={errors.phone}
        />
      </div>

      <div className={`${styles.row} ${styles.rowFull}`}>
        <Input
          label="Address line 1"
          required
          value={value.addressLine1}
          onChange={(e) => set('addressLine1', e.target.value)}
          autoComplete="address-line1"
          placeholder="Flat / House no., Building, Street"
          error={errors.addressLine1}
        />
        <Input
          label="Address line 2"
          optional
          value={value.addressLine2}
          onChange={(e) => set('addressLine2', e.target.value)}
          autoComplete="address-line2"
          placeholder="Landmark, Area"
        />
      </div>

      <div className={styles.row}>
        <Input
          label="City"
          required
          value={value.city}
          onChange={(e) => set('city', e.target.value)}
          autoComplete="address-level2"
          placeholder="Bengaluru"
          error={errors.city}
        />
        <Select
          label="State"
          required
          value={value.state}
          onChange={(e) => set('state', e.target.value)}
          placeholder="Select state"
          options={[...INDIAN_STATE_OPTIONS]}
          error={errors.state}
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Pincode"
          required
          value={value.pincode}
          onChange={(e) => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
          autoComplete="postal-code"
          placeholder="560001"
          hint="6-digit Indian postal code"
          error={errors.pincode}
        />
      </div>
    </>
  );
}

interface PaymentStepProps {
  value: PaymentForm;
  onChange: (v: PaymentForm) => void;
  errors: Errors<PaymentForm>;
}

function PaymentStep({ value, onChange, errors }: PaymentStepProps) {
  const set = <K extends keyof PaymentForm>(key: K, v: PaymentForm[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <>
      <h2 className={styles.stepTitle}>Payment method</h2>
      <p className={styles.stepIntro}>
        All transactions are encrypted. Choose your preferred payment.
      </p>

      <div className={styles.paymentList}>
        <RadioCard
          name="paymentMethod"
          value="cod"
          checked={value.method === 'cod'}
          onChange={(v) => set('method', v as PaymentMethod)}
          title="Cash on Delivery"
          subtitle="Pay when you receive your order. A small handling fee may apply."
        />
        <RadioCard
          name="paymentMethod"
          value="upi"
          checked={value.method === 'upi'}
          onChange={(v) => set('method', v as PaymentMethod)}
          title="UPI"
          subtitle="Pay instantly with Google Pay, PhonePe, Paytm, BHIM, etc."
        />
        <RadioCard
          name="paymentMethod"
          value="card"
          checked={value.method === 'card'}
          onChange={(v) => set('method', v as PaymentMethod)}
          title="Credit / Debit Card"
          subtitle="Visa, Mastercard, RuPay, American Express."
        />
      </div>

      {value.method === 'upi' && (
        <div className={styles.cardFields}>
          <Input
            label="UPI ID"
            required
            value={value.upiId}
            onChange={(e) => set('upiId', e.target.value)}
            placeholder="name@bank"
            hint="Example: 9876543210@upi"
            error={errors.upiId}
          />
        </div>
      )}

      {value.method === 'card' && (
        <div className={styles.cardFields}>
          <Input
            label="Card number"
            required
            inputMode="numeric"
            value={value.cardNumber}
            onChange={(e) =>
              set('cardNumber', formatCardNumber(e.target.value))
            }
            placeholder="1234 5678 9012 3456"
            error={errors.cardNumber}
          />
          <Input
            label="Name on card"
            required
            value={value.cardName}
            onChange={(e) => set('cardName', e.target.value)}
            placeholder="As shown on card"
            error={errors.cardName}
          />
          <div className={styles.row}>
            <Input
              label="Expiry"
              required
              value={value.cardExpiry}
              onChange={(e) => set('cardExpiry', formatExpiry(e.target.value))}
              placeholder="MM/YY"
              error={errors.cardExpiry}
            />
            <Input
              label="CVV"
              required
              inputMode="numeric"
              value={value.cardCvv}
              onChange={(e) =>
                set('cardCvv', e.target.value.replace(/\D/g, '').slice(0, 4))
              }
              placeholder="123"
              error={errors.cardCvv}
            />
          </div>
        </div>
      )}
    </>
  );
}

interface ReviewStepProps {
  shipping: ShippingForm;
  payment: PaymentForm;
  onEditShipping: () => void;
  onEditPayment: () => void;
}

function ReviewStep({ shipping, payment, onEditShipping, onEditPayment }: ReviewStepProps) {
  const { items } = useCart();

  return (
    <>
      <h2 className={styles.stepTitle}>Review your order</h2>
      <p className={styles.stepIntro}>
        Confirm everything looks right before placing the order.
      </p>

      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <h3>Shipping to</h3>
          <button type="button" className={styles.reviewEdit} onClick={onEditShipping}>
            Edit
          </button>
        </div>
        <p className={styles.reviewBody}>
          <strong>{shipping.fullName}</strong>
          <br />
          {shipping.addressLine1}
          {shipping.addressLine2 ? `, ${shipping.addressLine2}` : ''}
          <br />
          {shipping.city}, {shipping.state} {shipping.pincode}
          <br />
          {shipping.email} · +91 {shipping.phone}
        </p>
      </div>

      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <h3>Payment</h3>
          <button type="button" className={styles.reviewEdit} onClick={onEditPayment}>
            Edit
          </button>
        </div>
        <p className={styles.reviewBody}>{paymentLabel(payment)}</p>
      </div>

      <div className={styles.reviewSection}>
        <div className={styles.reviewHeader}>
          <h3>Items ({items.length})</h3>
        </div>
        <ul className={styles.miniItems}>
          {items.map((it) => {
            const p = getProductById(it.productId);
            if (!p) return null;
            return (
              <li key={it.id} className={styles.miniItem}>
                <img
                  src={p.images[0]}
                  alt={p.name}
                  className={styles.miniThumb}
                  loading="lazy"
                />
                <div>
                  <p className={styles.miniName}>{p.name}</p>
                  <p className={styles.miniMeta}>
                    {it.color} · Size {it.size} · Qty {it.quantity}
                  </p>
                </div>
                <span className={styles.miniPrice}>
                  {formatPrice(p.price * it.quantity)}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function validateShipping(s: ShippingForm): Errors<ShippingForm> {
  const errs: Errors<ShippingForm> = {};
  if (!s.fullName.trim()) errs.fullName = 'Please enter your name.';
  if (!s.email.trim()) errs.email = 'Please enter your email.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email))
    errs.email = 'Enter a valid email address.';
  if (!s.phone.trim()) errs.phone = 'Please enter your phone number.';
  else if (!/^[6-9]\d{9}$/.test(s.phone))
    errs.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!s.addressLine1.trim()) errs.addressLine1 = 'Please enter your address.';
  if (!s.city.trim()) errs.city = 'Please enter your city.';
  if (!s.state.trim()) errs.state = 'Please select your state.';
  if (!s.pincode.trim()) errs.pincode = 'Please enter your pincode.';
  else if (!/^\d{6}$/.test(s.pincode))
    errs.pincode = 'Pincode must be 6 digits.';
  return errs;
}

function validatePayment(p: PaymentForm): Errors<PaymentForm> {
  const errs: Errors<PaymentForm> = {};
  if (p.method === 'upi') {
    if (!p.upiId.trim()) errs.upiId = 'Please enter your UPI ID.';
    else if (!/^[\w.-]{2,}@[a-zA-Z]{2,}$/.test(p.upiId))
      errs.upiId = 'Enter a valid UPI ID, e.g. name@upi.';
  }
  if (p.method === 'card') {
    const digits = p.cardNumber.replace(/\s/g, '');
    if (!digits) errs.cardNumber = 'Please enter your card number.';
    else if (digits.length < 13 || digits.length > 19)
      errs.cardNumber = 'Card number looks invalid.';
    if (!p.cardName.trim()) errs.cardName = 'Please enter the name on card.';
    if (!p.cardExpiry) errs.cardExpiry = 'Enter expiry as MM/YY.';
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(p.cardExpiry))
      errs.cardExpiry = 'Enter expiry as MM/YY.';
    if (!p.cardCvv) errs.cardCvv = 'Enter CVV.';
    else if (p.cardCvv.length < 3) errs.cardCvv = 'CVV looks invalid.';
  }
  return errs;
}

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function paymentLabel(p: PaymentForm): string {
  if (p.method === 'cod') return 'Cash on Delivery';
  if (p.method === 'upi') return `UPI · ${p.upiId}`;
  const last4 = p.cardNumber.replace(/\s/g, '').slice(-4);
  return `Card ending in •••• ${last4 || '••••'}`;
}

function generateOrderId(): string {

  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 6);
  return `DS-${stamp}-${rand}`;
}

function scrollToTop() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export default CheckoutPage;
